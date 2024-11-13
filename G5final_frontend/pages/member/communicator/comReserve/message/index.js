import React, { useState, useEffect } from 'react';
import MemberLayout from '@/components/layout/member-layout';
import Message from '@/components/pet/message';
Messages.getLayout = function getLayout(page) {
  return <MemberLayout>{page}</MemberLayout>;
};
export default function Messages(props) {
  return (
    <>
      <Message status='ok' title='hi' content = '' button = '返回' url = '/' />
    </>
  );
}
