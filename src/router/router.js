var router = [{
        path: '/',
        name: 'login',
        component: resolve => require(['@/views/login'], resolve)
    },
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['@/views/login'], resolve)
    },
    {
        path: '/ceshi',
        name: 'ceshi',
        component: resolve => require(['@/views/ceshi'], resolve)
    },
    {
        path: '/logintype',
        name: 'logintype',
        component: resolve => require(['@/views/login/logintype'], resolve)
    },
    {
        path: '/projectType',
        name: 'projectType',
        component: resolve => require(['@/views/login/projectType'], resolve)
    },
    {
        path: '/home',
        name: 'home',
        component: resolve => require(['@/views/home'], resolve),
        children: [
            // {
            //     path: '/',
            //     name: 'Shouye',
            //     component: resolve => require(['@/views/shouye/index.vue'], resolve),
            //     redirect: '/home/shouye'
            // },
            // {
            //     path: '/home/shouye',
            //     name: 'Shouye',
            //     component: resolve => require(['@/views/shouye/index.vue'], resolve)
            // },
            {
                path: '/home/admission',
                name: 'Admission',
                component: resolve => require(['@/views/tendering/admission.vue'], resolve)
            },
            {
                path: '/home/subpackage',
                name: 'Subpackage',
                component: resolve => require(['@/views/tendering/subpackage.vue'], resolve)
            },
            // 自行招标
            {
                path: '/home/selfTender',
                name: 'SelfTender',
                component: resolve => require(['@/views/tendering/selfTender.vue'], resolve),
                meta: {
                    keepAlive: true, //此组件需要被缓存
                }
            },
            {
                path: '/home/entrustTender',
                name: 'EntrustTender',
                component: resolve => require(['@/views/tendering/entrustTender.vue'], resolve)
            },
            {
                path: '/home/invitaBid', //招标公告
                name: 'InvitaBid',
                component: resolve => require(['@/views/bidInvitation/invitaBid.vue'], resolve)
            },
            {
                path: '/home/changeNotice', //变更公告
                name: 'ChangeNotice',
                component: resolve => require(['@/views/bidInvitation/changeNotice.vue'], resolve)
            },
            {
                path: '/home/bidRequest', //投标邀请
                name: 'BidRequest',
                component: resolve => require(['@/views/bidInvitation/bidRequest.vue'], resolve)
            },
            {
                path: '/home/application', //投标报名
                name: 'Application',
                component: resolve => require(['@/views/bidInvitation/application.vue'], resolve)
            },
            {
                path: '/home/auditNotice', //资审公告
                name: 'AuditNotice',
                component: resolve => require(['@/views/bidInvitation/auditNotice.vue'], resolve)
            },
            {
                path: '/home/notHandled', //代办事项
                name: 'NotHandled',
                component: resolve => require(['@/views/backLog/notHandled.vue'], resolve)
            },
            {
                path: '/home/basicInformation', //诚信库管理--基本信息
                name: 'BasicInformation',
                component: resolve => require(['@/views/credibleManagement/basicInformation.vue'], resolve)
            },
            {
                path: '/home/basicPerson', //诚信库管理--从业人员
                name: 'BasicPerson',
                component: resolve => require(['@/views/credibleManagement/basicPerson.vue'], resolve)
            },
            {
                path: '/home/chargin', //资费管理--资费
                name: 'Chargin',
                component: resolve => require(['@/views/tariffManage/chargin.vue'], resolve)
            },
            {
                path: '/home/signUp', //投标业务--投标报名
                name: 'signUp',
                component: resolve => require(['@/views/tenderBusiness/signUp.vue'], resolve)
            },
            {
                path: '/home/winingNotice', //投标业务--中标通知书
                name: 'WiningNotice',
                component: resolve => require(['@/views/tenderBusiness/winingNotice.vue'], resolve)
            },
            {
                path: '/home/finallyNotice', //投标业务--招标结果通知书
                name: 'FinallyNotice',
                component: resolve => require(['@/views/tenderBusiness/finallyNotice.vue'], resolve)
            },
            {
                path: '/home/opening', //投标业务--开标录入
                name: 'opening',
                component: resolve => require(['@/views/tenderBusiness/opening.vue'], resolve)
            },
            {
                path: '/home/review', //投标业务--评标录入
                name: 'review',
                component: resolve => require(['@/views/tenderBusiness/review.vue'], resolve)
            },
            {
                path: '/home/endingNote', //投标业务--资审结果通知书
                name: 'endingNote',
                component: resolve => require(['@/views/tenderBusiness/endingNote.vue'], resolve)
            }

        ]
    },
    {
        path: '/selfTenderDetail',
        name: 'selfTenderDetail',
        component: resolve => require(['@/views/tendering/selfTenderDetail'], resolve),
        children: [
            // 项目入场登记
            {
                path: '/selfTenderDetail/entryRegistration',
                name: 'entryRegistration',
                component: resolve => require(['@/views/tendering/Detail/entryRegistration.vue'], resolve)
            },
            // 项目分包
            {
                path: '/selfTenderDetail/projectSubpackage',
                name: 'projectSubpackage',
                component: resolve => require(['@/views/tendering/Detail/projectSubpackage.vue'], resolve)
            },
            // 场地预约
            {
                path: '/selfTenderDetail/venueBooking',
                name: 'venueBooking',
                component: resolve => require(['@/views/tendering/Detail/venueBooking.vue'], resolve)
            },
            // 招标公告
            {
                path: '/selfTenderDetail/biddingAnnouncement',
                name: 'biddingAnnouncement',
                component: resolve => require(['@/views/tendering/Detail/biddingAnnouncement.vue'], resolve)
            },
            // 招标文件
            {
                path: '/selfTenderDetail/biddingDocument',
                name: 'biddingDocument',
                component: resolve => require(['@/views/tendering/Detail/biddingDocument.vue'], resolve)
            },
            // 主体注册
            {
                path: '/selfTenderDetail/registered',
                name: 'registered',
                component: resolve => require(['@/views/tendering/Detail/registered.vue'], resolve)
            },
            // 答疑通知
            {
                path: '/selfTenderDetail/AnswerInform',
                name: 'AnswerInform',
                component: resolve => require(['@/views/tendering/Detail/AnswerInform.vue'], resolve)
            },
            // 询疑答复
            {
                path: '/suspectedReply',
                name: 'suspectedReply',
                component: resolve => require(['@/views/tendering/Detail/suspectedReply.vue'], resolve)
            },
            //  答疑文件
            {
                path: '/selfTenderDetail/AnswerFile',
                name: 'AnswerFile',
                component: resolve => require(['@/views/tendering/Detail/AnswerFile.vue'], resolve)
            },
            // 变更公告
            {
                path: '/selfTenderDetail/changeInfo',
                name: 'changeInfo',
                component: resolve => require(['@/views/tendering/Detail/changeInfo.vue'], resolve)
            },
            // 控制价文件
            {
                path: '/selfTenderDetail/controlFile',
                name: 'controlFile',
                component: resolve => require(['@/views/tendering/Detail/controlFile.vue'], resolve)
            },
            //  业主专家
            {
                path: '/selfTenderDetail/ownerExperts',
                name: 'ownerExperts',
                component: resolve => require(['@/views/tendering/Detail/ownerExperts.vue'], resolve)
            },
            // 组建评标委员会
            {
                path: '/selfTenderDetail/establish',
                name: 'establish',
                component: resolve => require(['@/views/tendering/Detail/establish.vue'], resolve)
            },
            // 开标情况
            {
                path: '/selfTenderDetail/openingEntry',
                name: 'openingEntry',
                component: resolve => require(['@/views/tendering/Detail/openingEntry.vue'], resolve)
            },
            //  评标情况
            {
                path: '/selfTenderDetail/evaluationEntry',
                name: 'evaluationEntry',
                component: resolve => require(['@/views/tendering/Detail/evaluationEntry.vue'], resolve)
            },
            // 中标候选人公示
            {
                path: '/selfTenderDetail/candidate',
                name: 'candidate',
                component: resolve => require(['@/views/tendering/Detail/candidate.vue'], resolve)
            },
            // 中标结果公告
            {
                path: '/selfTenderDetail/result',
                name: 'result',
                component: resolve => require(['@/views/tendering/Detail/result.vue'], resolve)
            },
            //  中标通知书
            {
                path: '/selfTenderDetail/publicity',
                name: 'publicity',
                component: resolve => require(['@/views/tendering/Detail/publicity.vue'], resolve)
            },
            // 合同备案
            {
                path: '/selfTenderDetail/record',
                name: 'record',
                component: resolve => require(['@/views/tendering/Detail/record.vue'], resolve)
            },
            // 招标异常
            {
                path: '/selfTenderDetail/abnormal',
                name: 'abnormal',
                component: resolve => require(['@/views/tendering/Detail/abnormal.vue'], resolve)
            },
            // 电子档案
            {
                path: '/selfTenderDetail/emailCase',
                name: 'emailCase',
                component: resolve => require(['@/views/tendering/Detail/emailCase.vue'], resolve)
            },
            // 履约情况
            {
                path: '/selfTenderDetail/performance',
                name: 'performance',
                component: resolve => require(['@/views/tendering/Detail/performance.vue'], resolve)
            },
            // 资格预审文件
            {
                path: '/selfTenderDetail/prequalification',
                name: 'Prequalification',
                component: resolve => require(['../views/tendering/Detail/prequalification.vue'], resolve)
            },
            // 资审场地预约
            {
                path: '/selfTenderDetail/auditSplace',
                name: 'AuditSplace',
                component: resolve => require(['../views/tendering/Detail/auditSplace.vue'], resolve)
            },
            // 资审申请结果
            {
                path: '/selfTenderDetail/applicationResult',
                name: 'applicationResult',
                component: resolve => require(['../views/tendering/Detail/applicationResult.vue'], resolve)
            },
            // 组建资审委员会
            {
                path: '/selfTenderDetail/buildCommittee',
                name: 'buildCommittee',
                component: resolve => require(['../views/tendering/Detail/buildCommittee.vue'], resolve)
            },
            //资审公告
            {
                path: '/selfTenderDetail/reviewNotice',
                name: 'reviewNotice',
                component: resolve => require(['../views/tendering/Detail/reviewNotice.vue'], resolve)
            },
            //投标报名
            {
                path: '/selfTenderDetail/bidsignup',
                name: 'bidsignup',
                component: resolve => require(['../views/tendering/Detail/bidsignup.vue'], resolve)
            },
            //资审结果通知书
            {
                path: '/selfTenderDetail/resultAdvice',
                name: 'ResultAdvice',
                component: resolve => require(['../views/tendering/Detail/resultAdvice.vue'], resolve)
            },
        ]
    }
]
export default router