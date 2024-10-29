import React, { useState, useEffect } from 'react';

export default function Id(props) {
  return (
    <>
      <div className="PT-detail">
        <div className="container">
          <div className="pet-detail-yen">
            <div className="row mb-3 d-flex justify-content-center">
              {/* 刊登照片 */}
              <div className="col-lg-6 d-flex avatar-wrapper">
                <div className="avatar">
                  <img src="./images/pic/teacher.png" alt="1" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={201}
                    height={200}
                    viewBox="0 0 201 200"
                    fill="none"
                  >
                    <path d="M0.5 0H4.5V4H0.5V0Z" fill="#7D7D7D" />
                    <path d="M14.5 0H18.5V4H14.5V0Z" fill="#7D7D7D" />
                    <path d="M28.5 0H32.5V4H28.5V0Z" fill="#7D7D7D" />
                    <path d="M42.5 0H46.5V4H42.5V0Z" fill="#7D7D7D" />
                    <path d="M56.5 0H60.5V4H56.5V0Z" fill="#7D7D7D" />
                    <path d="M70.5 0H74.5V4H70.5V0Z" fill="#7D7D7D" />
                    <path d="M84.5 0H88.5V4H84.5V0Z" fill="#7D7D7D" />
                    <path d="M98.5 0H102.5V4H98.5V0Z" fill="#7D7D7D" />
                    <path d="M112.5 0H116.5V4H112.5V0Z" fill="#7D7D7D" />
                    <path d="M126.5 0H130.5V4H126.5V0Z" fill="#7D7D7D" />
                    <path d="M140.5 0H144.5V4H140.5V0Z" fill="#7D7D7D" />
                    <path d="M154.5 0H158.5V4H154.5V0Z" fill="#7D7D7D" />
                    <path d="M168.5 0H172.5V4H168.5V0Z" fill="#7D7D7D" />
                    <path d="M182.5 0H186.5V4H182.5V0Z" fill="#7D7D7D" />
                    <path d="M196.5 0H200.5V4H196.5V0Z" fill="#7D7D7D" />
                    <path d="M0.5 14H4.5V18H0.5V14Z" fill="#7D7D7D" />
                    <path d="M14.5 14H18.5V18H14.5V14Z" fill="#7D7D7D" />
                    <path d="M28.5 14H32.5V18H28.5V14Z" fill="#7D7D7D" />
                    <path d="M42.5 14H46.5V18H42.5V14Z" fill="#7D7D7D" />
                    <path d="M56.5 14H60.5V18H56.5V14Z" fill="#7D7D7D" />
                    <path d="M70.5 14H74.5V18H70.5V14Z" fill="#7D7D7D" />
                    <path d="M84.5 14H88.5V18H84.5V14Z" fill="#7D7D7D" />
                    <path d="M98.5 14H102.5V18H98.5V14Z" fill="#7D7D7D" />
                    <path d="M112.5 14H116.5V18H112.5V14Z" fill="#7D7D7D" />
                    <path d="M126.5 14H130.5V18H126.5V14Z" fill="#7D7D7D" />
                    <path d="M140.5 14H144.5V18H140.5V14Z" fill="#7D7D7D" />
                    <path d="M154.5 14H158.5V18H154.5V14Z" fill="#7D7D7D" />
                    <path d="M168.5 14H172.5V18H168.5V14Z" fill="#7D7D7D" />
                    <path d="M182.5 14H186.5V18H182.5V14Z" fill="#7D7D7D" />
                    <path d="M196.5 14H200.5V18H196.5V14Z" fill="#7D7D7D" />
                    <path d="M0.5 28H4.5V32H0.5V28Z" fill="#7D7D7D" />
                    <path d="M14.5 28H18.5V32H14.5V28Z" fill="#7D7D7D" />
                    <path d="M28.5 28H32.5V32H28.5V28Z" fill="#7D7D7D" />
                    <path d="M42.5 28H46.5V32H42.5V28Z" fill="#7D7D7D" />
                    <path d="M56.5 28H60.5V32H56.5V28Z" fill="#7D7D7D" />
                    <path d="M70.5 28H74.5V32H70.5V28Z" fill="#7D7D7D" />
                    <path d="M84.5 28H88.5V32H84.5V28Z" fill="#7D7D7D" />
                    <path d="M98.5 28H102.5V32H98.5V28Z" fill="#7D7D7D" />
                    <path d="M112.5 28H116.5V32H112.5V28Z" fill="#7D7D7D" />
                    <path d="M126.5 28H130.5V32H126.5V28Z" fill="#7D7D7D" />
                    <path d="M140.5 28H144.5V32H140.5V28Z" fill="#7D7D7D" />
                    <path d="M154.5 28H158.5V32H154.5V28Z" fill="#7D7D7D" />
                    <path d="M168.5 28H172.5V32H168.5V28Z" fill="#7D7D7D" />
                    <path d="M182.5 28H186.5V32H182.5V28Z" fill="#7D7D7D" />
                    <path d="M196.5 28H200.5V32H196.5V28Z" fill="#7D7D7D" />
                    <path d="M0.5 42H4.5V46H0.5V42Z" fill="#7D7D7D" />
                    <path d="M14.5 42H18.5V46H14.5V42Z" fill="#7D7D7D" />
                    <path d="M28.5 42H32.5V46H28.5V42Z" fill="#7D7D7D" />
                    <path d="M42.5 42H46.5V46H42.5V42Z" fill="#7D7D7D" />
                    <path d="M56.5 42H60.5V46H56.5V42Z" fill="#7D7D7D" />
                    <path d="M70.5 42H74.5V46H70.5V42Z" fill="#7D7D7D" />
                    <path d="M84.5 42H88.5V46H84.5V42Z" fill="#7D7D7D" />
                    <path d="M98.5 42H102.5V46H98.5V42Z" fill="#7D7D7D" />
                    <path d="M112.5 42H116.5V46H112.5V42Z" fill="#7D7D7D" />
                    <path d="M126.5 42H130.5V46H126.5V42Z" fill="#7D7D7D" />
                    <path d="M140.5 42H144.5V46H140.5V42Z" fill="#7D7D7D" />
                    <path d="M154.5 42H158.5V46H154.5V42Z" fill="#7D7D7D" />
                    <path d="M168.5 42H172.5V46H168.5V42Z" fill="#7D7D7D" />
                    <path d="M182.5 42H186.5V46H182.5V42Z" fill="#7D7D7D" />
                    <path d="M196.5 42H200.5V46H196.5V42Z" fill="#7D7D7D" />
                    <path d="M0.5 56H4.5V60H0.5V56Z" fill="#7D7D7D" />
                    <path d="M14.5 56H18.5V60H14.5V56Z" fill="#7D7D7D" />
                    <path d="M28.5 56H32.5V60H28.5V56Z" fill="#7D7D7D" />
                    <path d="M42.5 56H46.5V60H42.5V56Z" fill="#7D7D7D" />
                    <path d="M56.5 56H60.5V60H56.5V56Z" fill="#7D7D7D" />
                    <path d="M70.5 56H74.5V60H70.5V56Z" fill="#7D7D7D" />
                    <path d="M84.5 56H88.5V60H84.5V56Z" fill="#7D7D7D" />
                    <path d="M98.5 56H102.5V60H98.5V56Z" fill="#7D7D7D" />
                    <path d="M112.5 56H116.5V60H112.5V56Z" fill="#7D7D7D" />
                    <path d="M126.5 56H130.5V60H126.5V56Z" fill="#7D7D7D" />
                    <path d="M140.5 56H144.5V60H140.5V56Z" fill="#7D7D7D" />
                    <path d="M154.5 56H158.5V60H154.5V56Z" fill="#7D7D7D" />
                    <path d="M168.5 56H172.5V60H168.5V56Z" fill="#7D7D7D" />
                    <path d="M182.5 56H186.5V60H182.5V56Z" fill="#7D7D7D" />
                    <path d="M196.5 56H200.5V60H196.5V56Z" fill="#7D7D7D" />
                    <path d="M0.5 70H4.5V74H0.5V70Z" fill="#7D7D7D" />
                    <path d="M14.5 70H18.5V74H14.5V70Z" fill="#7D7D7D" />
                    <path d="M28.5 70H32.5V74H28.5V70Z" fill="#7D7D7D" />
                    <path d="M42.5 70H46.5V74H42.5V70Z" fill="#7D7D7D" />
                    <path d="M56.5 70H60.5V74H56.5V70Z" fill="#7D7D7D" />
                    <path d="M70.5 70H74.5V74H70.5V70Z" fill="#7D7D7D" />
                    <path d="M84.5 70H88.5V74H84.5V70Z" fill="#7D7D7D" />
                    <path d="M98.5 70H102.5V74H98.5V70Z" fill="#7D7D7D" />
                    <path d="M112.5 70H116.5V74H112.5V70Z" fill="#7D7D7D" />
                    <path d="M126.5 70H130.5V74H126.5V70Z" fill="#7D7D7D" />
                    <path d="M140.5 70H144.5V74H140.5V70Z" fill="#7D7D7D" />
                    <path d="M154.5 70H158.5V74H154.5V70Z" fill="#7D7D7D" />
                    <path d="M168.5 70H172.5V74H168.5V70Z" fill="#7D7D7D" />
                    <path d="M182.5 70H186.5V74H182.5V70Z" fill="#7D7D7D" />
                    <path d="M196.5 70H200.5V74H196.5V70Z" fill="#7D7D7D" />
                    <path d="M0.5 84H4.5V88H0.5V84Z" fill="#7D7D7D" />
                    <path d="M14.5 84H18.5V88H14.5V84Z" fill="#7D7D7D" />
                    <path d="M28.5 84H32.5V88H28.5V84Z" fill="#7D7D7D" />
                    <path d="M42.5 84H46.5V88H42.5V84Z" fill="#7D7D7D" />
                    <path d="M56.5 84H60.5V88H56.5V84Z" fill="#7D7D7D" />
                    <path d="M70.5 84H74.5V88H70.5V84Z" fill="#7D7D7D" />
                    <path d="M84.5 84H88.5V88H84.5V84Z" fill="#7D7D7D" />
                    <path d="M98.5 84H102.5V88H98.5V84Z" fill="#7D7D7D" />
                    <path d="M112.5 84H116.5V88H112.5V84Z" fill="#7D7D7D" />
                    <path d="M126.5 84H130.5V88H126.5V84Z" fill="#7D7D7D" />
                    <path d="M140.5 84H144.5V88H140.5V84Z" fill="#7D7D7D" />
                    <path d="M154.5 84H158.5V88H154.5V84Z" fill="#7D7D7D" />
                    <path d="M168.5 84H172.5V88H168.5V84Z" fill="#7D7D7D" />
                    <path d="M182.5 84H186.5V88H182.5V84Z" fill="#7D7D7D" />
                    <path d="M196.5 84H200.5V88H196.5V84Z" fill="#7D7D7D" />
                    <path d="M0.5 98H4.5V102H0.5V98Z" fill="#7D7D7D" />
                    <path d="M14.5 98H18.5V102H14.5V98Z" fill="#7D7D7D" />
                    <path d="M28.5 98H32.5V102H28.5V98Z" fill="#7D7D7D" />
                    <path d="M42.5 98H46.5V102H42.5V98Z" fill="#7D7D7D" />
                    <path d="M56.5 98H60.5V102H56.5V98Z" fill="#7D7D7D" />
                    <path d="M70.5 98H74.5V102H70.5V98Z" fill="#7D7D7D" />
                    <path d="M84.5 98H88.5V102H84.5V98Z" fill="#7D7D7D" />
                    <path d="M98.5 98H102.5V102H98.5V98Z" fill="#7D7D7D" />
                    <path d="M112.5 98H116.5V102H112.5V98Z" fill="#7D7D7D" />
                    <path d="M126.5 98H130.5V102H126.5V98Z" fill="#7D7D7D" />
                    <path d="M140.5 98H144.5V102H140.5V98Z" fill="#7D7D7D" />
                    <path d="M154.5 98H158.5V102H154.5V98Z" fill="#7D7D7D" />
                    <path d="M168.5 98H172.5V102H168.5V98Z" fill="#7D7D7D" />
                    <path d="M182.5 98H186.5V102H182.5V98Z" fill="#7D7D7D" />
                    <path d="M196.5 98H200.5V102H196.5V98Z" fill="#7D7D7D" />
                    <path d="M0.5 112H4.5V116H0.5V112Z" fill="#7D7D7D" />
                    <path d="M14.5 112H18.5V116H14.5V112Z" fill="#7D7D7D" />
                    <path d="M28.5 112H32.5V116H28.5V112Z" fill="#7D7D7D" />
                    <path d="M42.5 112H46.5V116H42.5V112Z" fill="#7D7D7D" />
                    <path d="M56.5 112H60.5V116H56.5V112Z" fill="#7D7D7D" />
                    <path d="M70.5 112H74.5V116H70.5V112Z" fill="#7D7D7D" />
                    <path d="M84.5 112H88.5V116H84.5V112Z" fill="#7D7D7D" />
                    <path d="M98.5 112H102.5V116H98.5V112Z" fill="#7D7D7D" />
                    <path d="M112.5 112H116.5V116H112.5V112Z" fill="#7D7D7D" />
                    <path d="M126.5 112H130.5V116H126.5V112Z" fill="#7D7D7D" />
                    <path d="M140.5 112H144.5V116H140.5V112Z" fill="#7D7D7D" />
                    <path d="M154.5 112H158.5V116H154.5V112Z" fill="#7D7D7D" />
                    <path d="M168.5 112H172.5V116H168.5V112Z" fill="#7D7D7D" />
                    <path d="M182.5 112H186.5V116H182.5V112Z" fill="#7D7D7D" />
                    <path d="M196.5 112H200.5V116H196.5V112Z" fill="#7D7D7D" />
                    <path d="M0.5 126H4.5V130H0.5V126Z" fill="#7D7D7D" />
                    <path d="M14.5 126H18.5V130H14.5V126Z" fill="#7D7D7D" />
                    <path d="M28.5 126H32.5V130H28.5V126Z" fill="#7D7D7D" />
                    <path d="M42.5 126H46.5V130H42.5V126Z" fill="#7D7D7D" />
                    <path d="M56.5 126H60.5V130H56.5V126Z" fill="#7D7D7D" />
                    <path d="M70.5 126H74.5V130H70.5V126Z" fill="#7D7D7D" />
                    <path d="M84.5 126H88.5V130H84.5V126Z" fill="#7D7D7D" />
                    <path d="M98.5 126H102.5V130H98.5V126Z" fill="#7D7D7D" />
                    <path d="M112.5 126H116.5V130H112.5V126Z" fill="#7D7D7D" />
                    <path d="M126.5 126H130.5V130H126.5V126Z" fill="#7D7D7D" />
                    <path d="M140.5 126H144.5V130H140.5V126Z" fill="#7D7D7D" />
                    <path d="M154.5 126H158.5V130H154.5V126Z" fill="#7D7D7D" />
                    <path d="M168.5 126H172.5V130H168.5V126Z" fill="#7D7D7D" />
                    <path d="M182.5 126H186.5V130H182.5V126Z" fill="#7D7D7D" />
                    <path d="M196.5 126H200.5V130H196.5V126Z" fill="#7D7D7D" />
                    <path d="M0.5 140H4.5V144H0.5V140Z" fill="#7D7D7D" />
                    <path d="M14.5 140H18.5V144H14.5V140Z" fill="#7D7D7D" />
                    <path d="M28.5 140H32.5V144H28.5V140Z" fill="#7D7D7D" />
                    <path d="M42.5 140H46.5V144H42.5V140Z" fill="#7D7D7D" />
                    <path d="M56.5 140H60.5V144H56.5V140Z" fill="#7D7D7D" />
                    <path d="M70.5 140H74.5V144H70.5V140Z" fill="#7D7D7D" />
                    <path d="M84.5 140H88.5V144H84.5V140Z" fill="#7D7D7D" />
                    <path d="M98.5 140H102.5V144H98.5V140Z" fill="#7D7D7D" />
                    <path d="M112.5 140H116.5V144H112.5V140Z" fill="#7D7D7D" />
                    <path d="M126.5 140H130.5V144H126.5V140Z" fill="#7D7D7D" />
                    <path d="M140.5 140H144.5V144H140.5V140Z" fill="#7D7D7D" />
                    <path d="M154.5 140H158.5V144H154.5V140Z" fill="#7D7D7D" />
                    <path d="M168.5 140H172.5V144H168.5V140Z" fill="#7D7D7D" />
                    <path d="M182.5 140H186.5V144H182.5V140Z" fill="#7D7D7D" />
                    <path d="M196.5 140H200.5V144H196.5V140Z" fill="#7D7D7D" />
                    <path d="M0.5 154H4.5V158H0.5V154Z" fill="#7D7D7D" />
                    <path d="M14.5 154H18.5V158H14.5V154Z" fill="#7D7D7D" />
                    <path d="M28.5 154H32.5V158H28.5V154Z" fill="#7D7D7D" />
                    <path d="M42.5 154H46.5V158H42.5V154Z" fill="#7D7D7D" />
                    <path d="M56.5 154H60.5V158H56.5V154Z" fill="#7D7D7D" />
                    <path d="M70.5 154H74.5V158H70.5V154Z" fill="#7D7D7D" />
                    <path d="M84.5 154H88.5V158H84.5V154Z" fill="#7D7D7D" />
                    <path d="M98.5 154H102.5V158H98.5V154Z" fill="#7D7D7D" />
                    <path d="M112.5 154H116.5V158H112.5V154Z" fill="#7D7D7D" />
                    <path d="M126.5 154H130.5V158H126.5V154Z" fill="#7D7D7D" />
                    <path d="M140.5 154H144.5V158H140.5V154Z" fill="#7D7D7D" />
                    <path d="M154.5 154H158.5V158H154.5V154Z" fill="#7D7D7D" />
                    <path d="M168.5 154H172.5V158H168.5V154Z" fill="#7D7D7D" />
                    <path d="M182.5 154H186.5V158H182.5V154Z" fill="#7D7D7D" />
                    <path d="M196.5 154H200.5V158H196.5V154Z" fill="#7D7D7D" />
                    <path d="M0.5 168H4.5V172H0.5V168Z" fill="#7D7D7D" />
                    <path d="M14.5 168H18.5V172H14.5V168Z" fill="#7D7D7D" />
                    <path d="M28.5 168H32.5V172H28.5V168Z" fill="#7D7D7D" />
                    <path d="M42.5 168H46.5V172H42.5V168Z" fill="#7D7D7D" />
                    <path d="M56.5 168H60.5V172H56.5V168Z" fill="#7D7D7D" />
                    <path d="M70.5 168H74.5V172H70.5V168Z" fill="#7D7D7D" />
                    <path d="M84.5 168H88.5V172H84.5V168Z" fill="#7D7D7D" />
                    <path d="M98.5 168H102.5V172H98.5V168Z" fill="#7D7D7D" />
                    <path d="M112.5 168H116.5V172H112.5V168Z" fill="#7D7D7D" />
                    <path d="M126.5 168H130.5V172H126.5V168Z" fill="#7D7D7D" />
                    <path d="M140.5 168H144.5V172H140.5V168Z" fill="#7D7D7D" />
                    <path d="M154.5 168H158.5V172H154.5V168Z" fill="#7D7D7D" />
                    <path d="M168.5 168H172.5V172H168.5V168Z" fill="#7D7D7D" />
                    <path d="M182.5 168H186.5V172H182.5V168Z" fill="#7D7D7D" />
                    <path d="M196.5 168H200.5V172H196.5V168Z" fill="#7D7D7D" />
                    <path d="M0.5 182H4.5V186H0.5V182Z" fill="#7D7D7D" />
                    <path d="M14.5 182H18.5V186H14.5V182Z" fill="#7D7D7D" />
                    <path d="M28.5 182H32.5V186H28.5V182Z" fill="#7D7D7D" />
                    <path d="M42.5 182H46.5V186H42.5V182Z" fill="#7D7D7D" />
                    <path d="M56.5 182H60.5V186H56.5V182Z" fill="#7D7D7D" />
                    <path d="M70.5 182H74.5V186H70.5V182Z" fill="#7D7D7D" />
                    <path d="M84.5 182H88.5V186H84.5V182Z" fill="#7D7D7D" />
                    <path d="M98.5 182H102.5V186H98.5V182Z" fill="#7D7D7D" />
                    <path d="M112.5 182H116.5V186H112.5V182Z" fill="#7D7D7D" />
                    <path d="M126.5 182H130.5V186H126.5V182Z" fill="#7D7D7D" />
                    <path d="M140.5 182H144.5V186H140.5V182Z" fill="#7D7D7D" />
                    <path d="M154.5 182H158.5V186H154.5V182Z" fill="#7D7D7D" />
                    <path d="M168.5 182H172.5V186H168.5V182Z" fill="#7D7D7D" />
                    <path d="M182.5 182H186.5V186H182.5V182Z" fill="#7D7D7D" />
                    <path d="M196.5 182H200.5V186H196.5V182Z" fill="#7D7D7D" />
                    <path d="M0.5 196H4.5V200H0.5V196Z" fill="#7D7D7D" />
                    <path d="M14.5 196H18.5V200H14.5V196Z" fill="#7D7D7D" />
                    <path d="M28.5 196H32.5V200H28.5V196Z" fill="#7D7D7D" />
                    <path d="M42.5 196H46.5V200H42.5V196Z" fill="#7D7D7D" />
                    <path d="M56.5 196H60.5V200H56.5V196Z" fill="#7D7D7D" />
                    <path d="M70.5 196H74.5V200H70.5V196Z" fill="#7D7D7D" />
                    <path d="M84.5 196H88.5V200H84.5V196Z" fill="#7D7D7D" />
                    <path d="M98.5 196H102.5V200H98.5V196Z" fill="#7D7D7D" />
                    <path d="M112.5 196H116.5V200H112.5V196Z" fill="#7D7D7D" />
                    <path d="M126.5 196H130.5V200H126.5V196Z" fill="#7D7D7D" />
                    <path d="M140.5 196H144.5V200H140.5V196Z" fill="#7D7D7D" />
                    <path d="M154.5 196H158.5V200H154.5V196Z" fill="#7D7D7D" />
                    <path d="M168.5 196H172.5V200H168.5V196Z" fill="#7D7D7D" />
                    <path d="M182.5 196H186.5V200H182.5V196Z" fill="#7D7D7D" />
                    <path d="M196.5 196H200.5V200H196.5V196Z" fill="#7D7D7D" />
                  </svg>
                </div>
              </div>
              {/* 文字內容 */}
              <div className="col-lg-6 d-flex justify-content-center align-items-center flex-column">
                <div className="title">
                  <h4>IVY</h4>
                  <h5>服務項目：遠距離溝通通話</h5>
                  <h5>取證日期：取證日期 2019.09</h5>
                  <h5>
                    計費方式：一般溝通：TWD 1500/hr｜遠距靈氣：TWD 500/20min
                  </h5>
                </div>
                <div className="introduce text-start">介紹</div>
                <div className="content">
                  <p>
                    有的人會說：養狗很麻煩，一養就要養十幾年。但是養了以後才發現牠們陪伴我們的日子，怎麼只有十幾年而已，我想這就是養寵物的唯一的缺點！
                    <br />
                    <br />
                    牠們會比我們還要早離開，但是牠們來到我們的人生中教會了我們很多事情，要好好的說愛，好好的說再見，珍惜當下的每一刻，牠們是我們人生中最好的生命導師。
                    <br />
                    <br />
                    我也因為我的毛孩才開始了不一樣的人生，數年前知道了寵物溝通師後，為了想理解自己家裡毛孩的心聲，除了一般相處上的默契之外，更想知道牠真正的想法，所以我就開始了學習的旅程，只為了傾聽牠，當然聽見牠內心聲音以後，非常地感動，我想這大概是很多飼主的願望，傾聽我們生命中最親密的夥伴，更為貼近理解，無論是平常生活交流，還是毛孩臨終時飼主會有很多的擔憂，都需要溝通師來協助，傳遞關係裡兩方的情緒及感受，這就是寵物溝通師存在目的。
                    <br />
                    <br />
                    對我而言，寵物溝通就像一本外語書需要翻譯，內文會根據譯者的方式讓文章多少會有點不同，然後讀者們會因為閱讀習慣特別欣賞某位譯者翻譯的書一樣道理，寵物溝通師很多，您也會找到自己特別喜歡的譯者的。
                    <br />
                    <br />
                    祝福天下所有萬物，皆能被接納理解以及公平的被愛。
                  </p>
                </div>
              </div>
            </div>
            {/* 按鈕 */}
            <div className="row py-5">
              <div className="col btn-rwd-none">
                <button className="btnn">←返回列表</button>
              </div>
              <div className="col btn-rwd-flex">
                <button className="btnn">預約寵物溝通師</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
