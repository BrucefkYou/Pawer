export const generateOtpMailHtml = (otpToken, mailFor) => `
<!doctype html>
    <html xmlns=http://www.w3.org/1999/xhtml xmlns:o=urn:schemas-microsoft-com:office:office
        xmlns:v=urn:schemas-microsoft-com:vml>

    <head>
        <!--[if gte mso 9]><xml><o:officedocumentsettings><o:allowpng><o:pixelsperinch>96</o:pixelsperinch></o:officedocumentsettings></xml><![endif]-->
        <meta content="text/html; charset=UTF-8" http-equiv=Content-Type>
        <meta content="width=device-width,initial-scale=1" name=viewport>
        <meta name=x-apple-disable-message-reformatting><!--[if !mso]><!-->
        <meta content="IE=edge" http-equiv=X-UA-Compatible><!--<![endif]-->
        <title></title>
        <style>
            @media only screen and (min-width:620px) {
                .u-row {
                    width: 600px !important
                }

                .u-row .u-col {
                    vertical-align: top
                }

                .u-row .u-col-50 {
                    width: 300px !important
                }

                .u-row .u-col-100 {
                    width: 600px !important
                }
            }

            @media only screen and (max-width:620px) {
                .u-row-container {
                    max-width: 100% !important;
                    padding-left: 0 !important;
                    padding-right: 0 !important
                }

                .u-row {
                    width: 100% !important
                }

                .u-row .u-col {
                    display: block !important;
                    width: 100% !important;
                    min-width: 320px !important;
                    max-width: 100% !important
                }

                .u-row .u-col>div {
                    margin: 0 auto
                }

                .u-row .u-col img {
                    max-width: 100% !important
                }
            }

            body {
                margin: 0;
                padding: 0
            }

            table,
            td,
            tr {
                border-collapse: collapse;
                vertical-align: top
            }

            p {
                margin: 0
            }

            .ie-container table,
            .mso-container table {
                table-layout: fixed
            }

            * {
                line-height: inherit
            }

            a[x-apple-data-detectors=true] {
                color: inherit !important;
                text-decoration: none !important
            }

            table,
            td {
                color: #000
            }

            #u_body a {
                color: #161a39;
                text-decoration: underline
            }
        </style><!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel=stylesheet><!--<![endif]-->

    <body class="clean-body u_body"
        style=margin:0;padding:0;-webkit-text-size-adjust:100%;background-color:#f9f9f9;color:#000>
        <!--[if IE]><div class=ie-container><![endif]--><!--[if mso]><div class=mso-container><![endif]-->
        <table cellpadding=0 cellspacing=0
            style="border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;min-width:320px;margin:0 auto;background-color:#f9f9f9;width:100%"
            id=u_body>
            <tr style=vertical-align:top>
                <td style=word-break:break-word;border-collapse:collapse!important;vertical-align:top>
                    <!--[if (mso)|(IE)]><table cellpadding=0 cellspacing=0 border=0 width=100%><tr><td style=background-color:#f9f9f9 align=center><![endif]-->
                    <div style=padding:0;background-color:#f9f9f9 class=u-row-container>
                        <div style="margin:0 auto;min-width:320px;max-width:600px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:#f9f9f9"
                            class=u-row>
                            <div
                                style=border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent>
                                <!--[if (mso)|(IE)]><table cellpadding=0 cellspacing=0 border=0 width=100%><tr><td style=padding:0;background-color:#f9f9f9 align=center><table cellpadding=0 cellspacing=0 border=0 style=width:600px><tr style=background-color:#f9f9f9><![endif]--><!--[if (mso)|(IE)]><td style="width:600px;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent"align=center width=600 valign=top><![endif]-->
                                <div style=max-width:320px;min-width:600px;display:table-cell;vertical-align:top
                                    class="u-col u-col-100">
                                    <div style=height:100%;width:100%!important><!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing:border-box;height:100%;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent">
                                            <!--<![endif]-->
                                            <table cellpadding=0 cellspacing=0 border=0 width=100%
                                                style=font-family:Lato,sans-serif role=presentation>
                                                <tr>
                                                    <td style=overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:Lato,sans-serif
                                                        align=left>
                                                        <table cellpadding=0 cellspacing=0 border=0 width=100%
                                                            style="border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;border-top:1px solid #f9f9f9;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%"
                                                            height=0px align=center>
                                                            <tr style=vertical-align:top>
                                                                <td
                                                                    style=word-break:break-word;border-collapse:collapse!important;vertical-align:top;font-size:0;line-height:0;mso-line-height-rule:exactly;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%>
                                                                    <span></span>
                                                        </table>
                                            </table><!--[if (!mso)&(!IE)]><!-->
                                        </div><!--<![endif]-->
                                    </div>
                                </div><!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div style=padding:0;background-color:transparent class=u-row-container>
                        <div style="margin:0 auto;min-width:320px;max-width:600px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:#fff"
                            class=u-row>
                            <div
                                style=border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent>
                                <!--[if (mso)|(IE)]><table cellpadding=0 cellspacing=0 border=0 width=100%><tr><td style=padding:0;background-color:transparent align=center><table cellpadding=0 cellspacing=0 border=0 style=width:600px><tr style=background-color:#fff><![endif]--><!--[if (mso)|(IE)]><td style="width:600px;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent"align=center width=600 valign=top><![endif]-->
                                <div style=max-width:320px;min-width:600px;display:table-cell;vertical-align:top
                                    class="u-col u-col-100">
                                    <div style=height:100%;width:100%!important><!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing:border-box;height:100%;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent">
                                            <!--<![endif]-->
                                            <table cellpadding=0 cellspacing=0 border=0 width=100%
                                                style=font-family:Lato,sans-serif role=presentation>
                                                <tr>
                                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px;font-family:Lato,sans-serif"
                                                        align=left>
                                                        <table cellpadding=0 cellspacing=0 border=0 width=100%>
                                                            <tr>
                                                                <td style=padding-right:0;padding-left:0 align=center>
                                                                    <img alt=Image
                                                                        src="https://github.com/EdwardCheng99/git001/blob/main/images/logo.png?raw=true"
                                                                        style=outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:inline-block!important;border:none;height:auto;float:none;width:17%;max-width:98.6px
                                                                        title=Image width=98.6 align=center border=0>
                                                        </table>
                                            </table><!--[if (!mso)&(!IE)]><!-->
                                        </div><!--<![endif]-->
                                    </div>
                                </div><!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div style=padding:0;background-color:transparent class=u-row-container>
                        <div style="margin:0 auto;min-width:320px;max-width:600px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:#161a39"
                            class=u-row>
                            <div
                                style=border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent>
                                <!--[if (mso)|(IE)]><table cellpadding=0 cellspacing=0 border=0 width=100%><tr><td style=padding:0;background-color:transparent align=center><table cellpadding=0 cellspacing=0 border=0 style=width:600px><tr style=background-color:#161a39><![endif]--><!--[if (mso)|(IE)]><td style="background-color:#22355c;width:600px;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent"align=center width=600 valign=top><![endif]-->
                                <div style=max-width:320px;min-width:600px;display:table-cell;vertical-align:top
                                    class="u-col u-col-100">
                                    <div style=background-color:#22355c;height:100%;width:100%!important>
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing:border-box;height:100%;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent">
                                            <!--<![endif]-->
                                            <table cellpadding=0 cellspacing=0 border=0 width=100%
                                                style=font-family:Lato,sans-serif role=presentation>
                                                <tr>
                                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:35px 10px 10px;font-family:Lato,sans-serif"
                                                        align=left>
                                                        <table cellpadding=0 cellspacing=0 border=0 width=100%>
                                                            <tr>
                                                                <td style=padding-right:0;padding-left:0 align=center>
                                                                    <img alt=Image
                                                                        src="https://github.com/EdwardCheng99/git001/blob/main/images/lock.png?raw=true"
                                                                        style=outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:inline-block!important;border:none;height:auto;float:none;width:10%;max-width:58px
                                                                        title=Image width=58 align=center border=0>
                                                        </table>
                                            </table>
                                            <table cellpadding=0 cellspacing=0 border=0 width=100%
                                                style=font-family:Lato,sans-serif role=presentation>
                                                <tr>
                                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:0 10px 30px;font-family:Lato,sans-serif"
                                                        align=left>
                                                        <div
                                                            style=font-size:14px;line-height:140%;text-align:left;word-wrap:break-word>
                                                            <p style=line-height:140%;text-align:center><span
                                                                    style=color:#fff><span
                                                                        style=font-size:28px;line-height:39.2px>${mailFor}-驗證碼</span></span>
                                                        </div>
                                            </table><!--[if (!mso)&(!IE)]><!-->
                                        </div><!--<![endif]-->
                                    </div>
                                </div><!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div style=padding:0;background-color:transparent class=u-row-container>
                        <div style="margin:0 auto;min-width:320px;max-width:600px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:#fff"
                            class=u-row>
                            <div
                                style=border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent>
                                <!--[if (mso)|(IE)]><table cellpadding=0 cellspacing=0 border=0 width=100%><tr><td style=padding:0;background-color:transparent align=center><table cellpadding=0 cellspacing=0 border=0 style=width:600px><tr style=background-color:#fff><![endif]--><!--[if (mso)|(IE)]><td style="width:600px;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent"align=center width=600 valign=top><![endif]-->
                                <div style=max-width:320px;min-width:600px;display:table-cell;vertical-align:top
                                    class="u-col u-col-100">
                                    <div style=height:100%;width:100%!important><!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing:border-box;height:100%;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent">
                                            <!--<![endif]-->
                                            <table cellpadding=0 cellspacing=0 border=0 width=100%
                                                style=font-family:Lato,sans-serif role=presentation>
                                                <tr>
                                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:Lato,sans-serif"
                                                        align=left>
                                                        <div
                                                            style=font-size:14px;line-height:170%;text-align:left;word-wrap:break-word>
                                                            <div>
                                                                <div><span
                                                                        style=font-size:16px;line-height:27.2px;color:#22355c>親愛的
                                                                        Pawer 會員 您好：</span></div><span
                                                                    style=color:#22355c;line-height:23.8px></span>
                                                            </div>
                                                            <div></div>
                                                            <div><span style=color:#22355c;line-height:23.8px></span>
                                                                <div><span
                                                                        style=font-size:16px;line-height:27.2px;color:#22355c>請於${mailFor}頁面的
                                                                        <span
                                                                            style=background-color:#fbeeb8;line-height:27.2px>驗證碼<span
                                                                                style=background-color:#fff;line-height:27.2px></span><span
                                                                                style=background-color:#fff;line-height:27.2px></span></span>欄位中，輸入下方
                                                                        <span
                                                                            style=background-color:#fbeeb8;line-height:27.2px>六</span><span
                                                                            style=background-color:#fbeeb8;line-height:27.2px>位數字</span>。</span>
                                                                </div><span
                                                                    style=color:#22355c;line-height:23.8px></span>
                                                                <div><span
                                                                        style=font-size:16px;line-height:27.2px;color:#22355c>請注意驗證碼將於寄送後<span
                                                                            style=background-color:#fbeeb8;line-height:27.2px>30分鐘</span>後到期，如有任何問題請洽客服人員。</span>
                                                                </div>
                                                            </div>
                                                            <p style=font-size:14px;line-height:170%>
                                                        </div>
                                            </table>
                                            <table cellpadding=0 cellspacing=0 border=0 width=100%
                                                style=font-family:Lato,sans-serif role=presentation>
                                                <tr>
                                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:0 40px;font-family:Lato,sans-serif"
                                                        align=left><!--[if mso
                                  ]><style>
                                    .v-button {
                                      background: transparent !important;
                                    }
                                  </style><!
                                [endif]-->
                                                        <div align=center>
                                                            <!--[if mso]><v:roundrect xmlns:v=urn:schemas-microsoft-com:vml xmlns:w=urn:schemas-microsoft-com:office:word href=""style=height:52px;v-text-anchor:middle;width:175px arcsize=2% strokecolor=#22355c strokeweight=2px fillcolor=#ffffff><w:anchorlock><center style=color:#22355c><![endif]-->
                                                            <span
                                                                style=box-sizing:border-box;display:inline-block;text-decoration:none;-webkit-text-size-adjust:none;text-align:center;color:#22355c;background-color:#fff;border-radius:1px;-webkit-border-radius:1px;-moz-border-radius:1px;width:auto;max-width:100%;overflow-wrap:break-word;word-break:break-word;word-wrap:break-word;mso-border-alt:none;border-top-width:3px;border-top-style:solid;border-top-color:#22355c;border-left-width:3px;border-left-style:solid;border-left-color:#22355c;border-right-width:3px;border-right-style:solid;border-right-color:#22355c;border-bottom-width:3px;border-bottom-style:solid;border-bottom-color:#22355c;font-size:14px;letter-spacing:3px
                                                                class=v-button href="" target=_blank><span
                                                                    style="display:block;padding:15px 40px;line-height:100%"><strong><span
                                                                            style=font-size:22px;line-height:22px>${otpToken}</span></strong></span>
                                                            </span><!--[if mso]><![endif]--></div>
                                            </table>
                                            <table cellpadding=0 cellspacing=0 border=0 width=100%
                                                style=font-family:Lato,sans-serif role=presentation>
                                                <tr>
                                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 40px 30px;font-family:Lato,sans-serif"
                                                        align=left>
                                                        <div
                                                            style=font-size:14px;line-height:140%;text-align:center;word-wrap:break-word>
                                                            <p style=font-size:14px;line-height:140%;text-align:center>
                                                                <span
                                                                    style=color:#888;font-size:14px;line-height:19.6px><em><span
                                                                            style=line-height:19.6px>如果您未申請要求${mailFor}，請忽略此封郵件</span></em></span>
                                                        </div>
                                            </table><!--[if (!mso)&(!IE)]><!-->
                                        </div><!--<![endif]-->
                                    </div>
                                </div><!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div style=padding:0;background-color:transparent class=u-row-container>
                        <div style="margin:0 auto;min-width:320px;max-width:600px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:#18163a"
                            class=u-row>
                            <div
                                style=border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent>
                                <!--[if (mso)|(IE)]><table cellpadding=0 cellspacing=0 border=0 width=100%><tr><td style=padding:0;background-color:transparent align=center><table cellpadding=0 cellspacing=0 border=0 style=width:600px><tr style=background-color:#18163a><![endif]--><!--[if (mso)|(IE)]><td style="background-color:#22355c;width:300px;padding:20px 20px 0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent"align=center width=300 valign=top><![endif]-->
                                <div style=max-width:320px;min-width:300px;display:table-cell;vertical-align:top
                                    class="u-col u-col-50">
                                    <div style=background-color:#22355c;height:100%;width:100%!important>
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing:border-box;height:100%;padding:20px 20px 0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent">
                                            <!--<![endif]-->
                                            <table cellpadding=0 cellspacing=0 border=0 width=100%
                                                style=font-family:Lato,sans-serif role=presentation>
                                                <tr>
                                                    <td style=overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:Lato,sans-serif
                                                        align=left>
                                                        <div
                                                            style=font-size:14px;line-height:140%;text-align:left;word-wrap:break-word>
                                                            <p style=font-size:14px;line-height:140%><span
                                                                    style=font-size:16px;line-height:22.4px;color:#ecf0f1>追蹤與聯繫</span>
                                                            <p style=font-size:14px;line-height:140%><span
                                                                    style=font-size:14px;line-height:19.6px;color:#ecf0f1>LINE客服
                                                                    | @pawer</span>
                                                            <p style=font-size:14px;line-height:140%><span
                                                                    style=font-size:14px;line-height:19.6px;color:#ecf0f1>信箱聯絡
                                                                    |
                                                                    pawer@pawer<span>contact</span>.<span>com</span></span>
                                                        </div>
                                            </table><!--[if (!mso)&(!IE)]><!-->
                                        </div><!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><td style="background-color:#22355c;width:300px;padding:0 0 0 20px;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent"align=center width=300 valign=top><![endif]-->
                                <div style=max-width:320px;min-width:300px;display:table-cell;vertical-align:top
                                    class="u-col u-col-50">
                                    <div style=background-color:#22355c;height:100%;width:100%!important>
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing:border-box;height:100%;padding:0 0 0 20px;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent">
                                            <!--<![endif]-->
                                            <table cellpadding=0 cellspacing=0 border=0 width=100%
                                                style=font-family:Lato,sans-serif role=presentation>
                                                <tr>
                                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px 10px;font-family:Lato,sans-serif"
                                                        align=left>
                                                        <div style=direction:ltr align=left>
                                                            <div style=display:table;max-width:187px>
                                                                <!--[if (mso)|(IE)]><table cellpadding=0 cellspacing=0 border=0 width=187><tr><td style=border-collapse:collapse align=left><table cellpadding=0 cellspacing=0 border=0 width=100% style=border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;width:187px><tr><![endif]--><!--[if (mso)|(IE)]><td style=width:32px;padding-right:15px valign=top width=32><![endif]-->
                                                                <table cellpadding=0 cellspacing=0 border=0 width=32
                                                                    style=width:32px!important;height:32px!important;display:inline-block;border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;margin-right:15px
                                                                    height=32>
                                                                    <tr style=vertical-align:top>
                                                                        <td style=word-break:break-word;border-collapse:collapse!important;vertical-align:top
                                                                            valign=middle><a href="" target=_blank
                                                                                title=Facebook><img alt=Facebook
                                                                                    src="https://github.com/EdwardCheng99/git001/blob/main/images/fb.png?raw=true"
                                                                                    style=outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:block!important;border:none;height:auto;float:none;max-width:32px!important
                                                                                    title=Facebook width=32></a>
                                                                </table>
                                                                <!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><td style=width:32px;padding-right:15px valign=top width=32><![endif]--><!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><td style=width:32px;padding-right:15px valign=top width=32><![endif]-->
                                                                <table cellpadding=0 cellspacing=0 border=0 width=32
                                                                    style=width:32px!important;height:32px!important;display:inline-block;border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;margin-right:15px
                                                                    height=32>
                                                                    <tr style=vertical-align:top>
                                                                        <td style=word-break:break-word;border-collapse:collapse!important;vertical-align:top
                                                                            valign=middle><a href="" target=_blank
                                                                                title=Instagram><img alt=Instagram
                                                                                    src="https://github.com/EdwardCheng99/git001/blob/main/images/ins.png?raw=true.png"
                                                                                    style=outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:block!important;border:none;height:auto;float:none;max-width:32px!important
                                                                                    title=Instagram width=32></a>
                                                                </table>
                                                                <!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><td style=width:32px;padding-right:0 valign=top width=32><![endif]-->
                                                                <table cellpadding=0 cellspacing=0 border=0 width=32
                                                                    style=width:32px!important;height:32px!important;display:inline-block;border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;margin-right:0
                                                                    height=32>
                                                                    <tr style=vertical-align:top>
                                                                        <td style=word-break:break-word;border-collapse:collapse!important;vertical-align:top
                                                                            valign=middle><a href="" target=_blank
                                                                                title=LinkedIn><img alt=LinkedIn
                                                                                    src="https://github.com/EdwardCheng99/git001/blob/main/images/ig.png?raw=true"
                                                                                    style=outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:block!important;border:none;height:auto;float:none;max-width:32px!important
                                                                                    title=LinkedIn width=32></a>
                                                                </table>
                                                                <!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><![endif]-->
                                                            </div>
                                                        </div>
                                            </table>
                                            <table cellpadding=0 cellspacing=0 border=0 width=100%
                                                style=font-family:Lato,sans-serif role=presentation>
                                                <tr>
                                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:5px 10px 10px;font-family:Lato,sans-serif"
                                                        align=left>
                                                        <div
                                                            style=font-size:14px;line-height:140%;text-align:left;word-wrap:break-word>
                                                            <p style=line-height:140%;font-size:14px><span
                                                                    style=font-size:14px;line-height:19.6px><span
                                                                        style=color:#ecf0f1;font-size:14px;line-height:19.6px><span
                                                                            style=line-height:19.6px;font-size:14px>Company
                                                                            © All Rights Reserved</span></span></span>
                                                        </div>
                                            </table><!--[if (!mso)&(!IE)]><!-->
                                        </div><!--<![endif]-->
                                    </div>
                                </div><!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div style=padding:0;background-color:#f9f9f9 class=u-row-container>
                        <div style="margin:0 auto;min-width:320px;max-width:600px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:#1c103b"
                            class=u-row>
                            <div
                                style=border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent>
                                <!--[if (mso)|(IE)]><table cellpadding=0 cellspacing=0 border=0 width=100%><tr><td style=padding:0;background-color:#f9f9f9 align=center><table cellpadding=0 cellspacing=0 border=0 style=width:600px><tr style=background-color:#1c103b><![endif]--><!--[if (mso)|(IE)]><td style="background-color:#22355c;width:600px;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent"align=center width=600 valign=top><![endif]-->
                                <div style=max-width:320px;min-width:600px;display:table-cell;vertical-align:top
                                    class="u-col u-col-100">
                                    <div style=background-color:#22355c;height:100%;width:100%!important>
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing:border-box;height:100%;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent">
                                            <!--<![endif]-->
                                            <table cellpadding=0 cellspacing=0 border=0 width=100%
                                                style=font-family:Lato,sans-serif role=presentation>
                                                <tr>
                                                    <td style=overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:Lato,sans-serif
                                                        align=left>
                                                     
                                            </table><!--[if (!mso)&(!IE)]><!-->
                                        </div><!--<![endif]-->
                                    </div>
                                </div><!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div style=padding:0;background-color:transparent class=u-row-container>
                        <div style="margin:0 auto;min-width:320px;max-width:600px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:#f9f9f9"
                            class=u-row>
                            <div
                                style=border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent>
                                <!--[if (mso)|(IE)]><table cellpadding=0 cellspacing=0 border=0 width=100%><tr><td style=padding:0;background-color:transparent align=center><table cellpadding=0 cellspacing=0 border=0 style=width:600px><tr style=background-color:#f9f9f9><![endif]--><!--[if (mso)|(IE)]><td style="width:600px;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent"align=center width=600 valign=top><![endif]-->
                                <div style=max-width:320px;min-width:600px;display:table-cell;vertical-align:top
                                    class="u-col u-col-100">
                                    <div style=height:100%;width:100%!important><!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="box-sizing:border-box;height:100%;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent">
                                            <!--<![endif]-->
                                            <table cellpadding=0 cellspacing=0 border=0 width=100%
                                                style=font-family:Lato,sans-serif role=presentation>
                                                <tr>
                                                    <td style="overflow-wrap:break-word;word-break:break-word;padding:0 40px 30px 20px;font-family:Lato,sans-serif"
                                                        align=left>
                                                        <div
                                                            style=font-size:14px;line-height:140%;text-align:left;word-wrap:break-word>
                                                        </div>
                                            </table><!--[if (!mso)&(!IE)]><!-->
                                        </div><!--<![endif]-->
                                    </div>
                                </div><!--[if (mso)|(IE)]><![endif]--><!--[if (mso)|(IE)]><![endif]-->
                            </div>
                        </div>
                    </div><!--[if (mso)|(IE)]><![endif]-->
        </table><!--[if mso]><![endif]--><!--[if IE]><![endif]-->
`
