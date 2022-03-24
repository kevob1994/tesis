import Modal from 'antd/lib/modal/Modal';
import FlexView from 'react-flexview/lib';
import classNames from 'classnames';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React from 'react';
import moment from 'moment';
import './index.scss';

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
  increaseMonth?: (qty: number) => void;
  data?: ICalendarData[];
  startEnd?: moment.Moment[];
  classroomWeeks?: IClassRoomCallDateInfo[];
}

const CalendarPage = () => {
  return (
    <FlexView column className='calendarContainer'>
      <Header />
      <Days />
      {/* <Dates {...props} /> */}
    </FlexView>
  );
};

const Header = (props: ICalendarProps) => {
  return (
    <FlexView
      className='calendarHeader'
      vAlignContent='center'
      style={{
        justifyContent: !!props.increaseMonth ? 'space-between' : 'center',
      }}
    >
      {!!props.increaseMonth && (
        <LeftOutlined onClick={() => console.log('click')} />
      )}

      <LeftOutlined onClick={() => console.log('click')} />
      <FlexView column>
        <p className='month'>
          {moment().add(props.monthOffset, 'month').format('MMMM')}
        </p>
        <p className='year'>
          {moment().add(props.monthOffset, 'month').format('YYYY')}
        </p>
      </FlexView>
      {!!props.increaseMonth && (
        <RightOutlined onClick={() => console.log('click')} />
      )}
      <RightOutlined onClick={() => console.log('click')} />
    </FlexView>
  );
};

const Days = () => {
  return (
    <FlexView vAlignContent='center' className='days'>
      <p>Sun</p>
      <p>Mon</p>
      <p>Tue</p>
      <p>Wed</p>
      <p>Thu</p>
      <p>Fri</p>
      <p>Sat</p>
    </FlexView>
  );
};

// const Dates = observer((props: ICalendarProps) => {
//   let d = moment().add(props.monthOffset, 'month').startOf('month');
//   const bp = useBreakpoint();
//   const startOffset = d.day();
//   const restOffset = 7 - d.clone().add(1, 'month').day();
//   const d_start = d.clone().subtract(startOffset, 'day');
//   const [detailsModal, setDetailsModal] = React.useState<number>(null);
//   return (
//     <div className={styles.dates}>
//       {_.range(0, d.daysInMonth() + startOffset + restOffset + 3).map((n) => {
//         const date = d_start.clone().add(n, 'day');
//         let booking: ICalendarData = null;
//         if (date.month() === moment().add(props.monthOffset, 'month').month()) {
//           booking = props.data?.find((v) => {
//             const d = moment(v.date).startOf('day');
//             if (d.date() === date.date() && d.month() === date.month()) {
//               return true;
//             } else {
//               return false;
//             }
//           });
//         }
//         let classroomBooking: [moment.Moment, moment.Moment][] = [];

//         const isToday = date
//           .clone()
//           .startOf('day')
//           .isSame(moment().startOf('day'));
//         const disabledDate =
//           date.month() != moment().add(props.monthOffset, 'month').month();
//         let classroomDate = false;
//         if (!!props.startEnd && props.startEnd.length >= 2) {
//           if (date.isBetween(props.startEnd[0], props.startEnd[1])) {
//             classroomDate = true;
//             if (!!props.classroomWeeks) {
//               props.classroomWeeks.forEach((v) => {
//                 const m = moment()
//                   .utc()
//                   .weekday(v.dayOfWeek)
//                   .set('hour', v.hour)
//                   .set('minute', v.minute);
//                 const local = m.clone().local();
//                 if (local.weekday() === date.weekday()) {
//                   const s = date
//                     .clone()
//                     .startOf('day')
//                     .add(local.hour(), 'hour')
//                     .add(local.minute(), 'minute');
//                   const e = date
//                     .clone()
//                     .startOf('day')
//                     .add(local.hour(), 'hour')
//                     .add(local.minute(), 'minute')
//                     .add(v.duration, 'minute');
//                   classroomBooking.push([s, e]);
//                 }
//               });
//             }
//           }
//         }

//         const contentHours = (
//           <>
//             {booking && (
//               <div className={'active'}>
//                 <span>{moment(booking.date).format('HH:mm')}</span>
//               </div>
//             )}
//             {!disabledDate &&
//               classroomBooking.map((v, idx) => {
//                 if (idx >= 2) return null;
//                 return (
//                   <div className={'active'}>
//                     <span>{`${v[0].format('HH:mm')}-${v[1].format(
//                       'HH:mm'
//                     )}`}</span>
//                   </div>
//                 );
//               })}
//           </>
//         );

//         return (
//           <FlexView
//             column
//             className={classNames('date', {
//               ['today']: isToday && !disabledDate,
//               ['disabled']: disabledDate,
//               ['classroomDate']:
//                 !disabledDate && (booking || classroomBooking.length > 0),
//             })}
//             onClick={() => {
//               if (!disabledDate && (booking || classroomBooking.length > 0)) {
//                 setDetailsModal(date.date());
//               }
//             }}
//           >
//             <span
//               className={classNames({
//                 ['activeMobile']: !(
//                   disabledDate ||
//                   (!booking && classroomBooking.length === 0) ||
//                   bp.md
//                 ),
//               })}
//             >
//               {date.date()}
//             </span>
//             {bp.md ? contentHours : null}
//           </FlexView>
//         );
//       })}
//       <Modal
//         visible={false}
//         footer={null}
//         wrapClassName={'detailsBookingWrapper'}
//         onCancel={() => {}}
//       >
//         {/* <ClassroomBookingDetail month={props.monthOffset} day={detailsModal} {...props}/> */}
//       </Modal>
//     </div>
//   );
// });

export default CalendarPage;
