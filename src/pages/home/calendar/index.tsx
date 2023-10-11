import Modal from "antd/lib/modal/Modal";
import FlexView from "react-flexview/lib";
import classNames from "classnames";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import * as _ from "lodash";
import moment from "moment";
import "./index.scss";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { translateMonth } from "../../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { getListEvaluationsCourse } from "../../../actions/course";
import { useParams } from "react-router-dom";
import { EvaluationsI, StoreI } from "../../../utils/interfaces";
import LoaderSpin from "components/LoaderSpin";

export interface ICalendarData {
  date: string;
}
export interface IClassRoomCallDateInfo {
  dayOfWeek: number;
  hour: number;
  minute: number;
  duration: number; // In minutes
}

interface ICalendarProps {
  monthOffset?: number;
  increaseMonth: (qty: number) => void;
  data?: ICalendarData[];
  startEnd?: moment.Moment[];
  classroomWeeks?: IClassRoomCallDateInfo[];
  evaluationsByMonth?: EvaluationsI[];
}

const test = [
  {
    dayOfWeek: 6,
    hour: 9,
    minute: 10,
    duration: 60, // In minutes
  },
];

const CalendarPage = () => {
  const [monthOffset, setMonthOffset] = React.useState<number>(0);
  const [evaluationsByMonth, setEvaluationsByMonth] = React.useState<
    EvaluationsI[]
  >([]);
  const dispatch = useDispatch();
  const loadEvaluations = (id: string) =>
    dispatch(getListEvaluationsCourse(id));
  const { id } = useParams();
  const { evaluations, loading } = useSelector(
    (state: StoreI) => state.courses
  );

  useEffect(() => {
    if (id) loadEvaluations(id);
  }, []);

  useEffect(() => {
    const items = evaluations.filter(
      (evaluations) =>
        moment(evaluations.date).format("M") ===
          moment().add(monthOffset, "month").format("M") ||
        moment(evaluations.date).format("M") ===
          moment()
            .add(monthOffset - 1, "month")
            .format("M") ||
        moment(evaluations.date).format("M") ===
          moment()
            .add(monthOffset + 1, "month")
            .format("M")
    );
    setEvaluationsByMonth(items);
  }, [evaluations, monthOffset]);

  return (
    <>
      <h1>Calendario</h1>
      {loading ? (
        <LoaderSpin />
      ) : (
        <FlexView column className='calendarContainer'>
          <>
            {" "}
            <Header
              monthOffset={monthOffset}
              increaseMonth={(qty: number) => setMonthOffset(monthOffset + qty)}
            />
            <Days />
            <Dates
              monthOffset={monthOffset}
              increaseMonth={(qty: number) => setMonthOffset(monthOffset + qty)}
              startEnd={[moment(new Date()), moment(new Date()).add(30)]}
              classroomWeeks={test}
              evaluationsByMonth={evaluationsByMonth}
            />
          </>
        </FlexView>
      )}
    </>
  );
};

const Header = (props: ICalendarProps) => {
  return (
    <FlexView
      className='calendarHeader'
      vAlignContent='center'
      style={{
        justifyContent: !!props.increaseMonth ? "space-between" : "center",
      }}
    >
      {!!props.increaseMonth && (
        <LeftOutlined onClick={() => props.increaseMonth(-1)} />
      )}

      <FlexView column>
        <p className='month'>
          {translateMonth(
            moment()
              .add(props.monthOffset, "month")
              .format("MMMM")
              .toLocaleUpperCase()
          )}
        </p>
        <p className='year'>
          {moment().add(props.monthOffset, "month").format("YYYY")}
        </p>
      </FlexView>
      {!!props.increaseMonth && (
        <RightOutlined onClick={() => props.increaseMonth(1)} />
      )}
    </FlexView>
  );
};

const Days = () => {
  return (
    <FlexView vAlignContent='center' className='days'>
      <p>Dom</p>
      <p>Lun</p>
      <p>Mar</p>
      <p>Mie</p>
      <p>Jue</p>
      <p>Vie</p>
      <p>Sab</p>
    </FlexView>
  );
};

const Dates = (props: ICalendarProps) => {
  let d = moment().add(props.monthOffset, "month").startOf("month");
  // debugger;
  const bp = useBreakpoint();
  const startOffset = d.day();
  const restOffset = 7 - d.clone().add(1, "month").day();
  const d_start = d.clone().subtract(startOffset, "day");
  const [detailsModal, setDetailsModal] = React.useState<any>(null);

  return (
    <div className='dates'>
      {_.range(0, d.daysInMonth() + startOffset + restOffset + 3).map((n) => {
        const date = d_start.clone().add(n, "day");
        let booking: any = null;
        if (date.month() === moment().add(props.monthOffset, "month").month()) {
          booking = props.data?.find((v) => {
            const d = moment(v.date).startOf("day");
            if (d.date() === date.date() && d.month() === date.month()) {
              return true;
            } else {
              return false;
            }
          });
        }
        let classroomBooking: [moment.Moment, moment.Moment][] = [];

        const isToday = date
          .clone()
          .startOf("day")
          .isSame(moment().startOf("day"));
        const disabledDate =
          date.month() != moment().add(props.monthOffset, "month").month();

        // if (!!props.startEnd && props.startEnd.length >= 2) {
        //   if (date.isBetween(props.startEnd[0], props.startEnd[1])) {

        const infoEvaluation = (day: number, month: number, year: number, disabledDate: boolean) => {
          const { evaluationsByMonth } = props;
          if (evaluationsByMonth) {
            const evaluationInDay = evaluationsByMonth.filter((evaluation) => {
              return (
                +moment(evaluation.date).format("D") === day &&
                moment(evaluation.date).month() === month &&
                moment(evaluation.date).year() === year
              );
            });
            if (evaluationInDay.length == 0) return null;

            return (
              <>
                <div className={disabledDate ? 'disable-evaluation': 'active'}>
                  <p>{evaluationInDay[0].name}</p>
                  <span>{moment(evaluationInDay[0].date).format("HH:MM")}</span>
                </div>
              </>
            );
          } else {
            return null;
          }
        };


        return (
          <FlexView
            column
            className={classNames("date", {
              today: isToday && !disabledDate,
              disabled: disabledDate,
              classroomDate:
                !disabledDate && (booking || classroomBooking.length > 0),
            })}
            onClick={() => {
              if (!disabledDate && (booking || classroomBooking.length > 0)) {
                setDetailsModal(date.date());
              }
            }}
          >
            <span
              className={classNames({
                activeMobile: !(
                  disabledDate ||
                  (!booking && classroomBooking.length === 0) ||
                  bp.md
                ),
              })}
            >
              {date.date()}
            </span>

            {bp.md
              ? infoEvaluation(date.date(), date.month(), date.year(), disabledDate)
              : null}
          </FlexView>
        );
      })}
      <Modal
        visible={!!detailsModal}
        footer={null}
        wrapClassName='detailsBookingWrapper'
        onCancel={() => {
          setDetailsModal(null);
        }}
      >
        {/* <ClassroomBookingDetail
          month={props.monthOffset}
          day={detailsModal}
          {...props}
        /> */}
      </Modal>
    </div>
  );
};

export default CalendarPage;
