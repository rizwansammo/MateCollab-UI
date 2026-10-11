export type Person = {id:string; name:string; title:string; email:string; tone:number; presence:string; role:string; status:string; spaces?:string[]};
export type Message = {id:string; user:string; text:string; time:string; reactions?:Record<string,number>; reacted?:string[]; replies?:Message[]; file?:string; edited?:boolean; pinned?:boolean; saved?:boolean; quote?:string};
export type Conversation = {id:string; name:string; kind:'dm'|'group'|'channel'; members:string[]; unread:number; space?:string; private?:boolean; favorite?:boolean; archived?:boolean; description?:string};
export type Space = {id:string; name:string; description:string; private:boolean; type:string; members:string[]; joined:boolean; archived?:boolean};
export type FileRecord = {id:string; name:string; type:string; size:string; owner:string; source:string; date:string; content?:string; url?:string};
export type Meeting = {id:string; title:string; date:string; time:string; duration:string; space:string; members:string[]; agenda:string; past?:boolean; guest?:boolean; waiting?:boolean; timezone?:string; channel?:string};
export type Action = {id:string; title:string; assignee:string; due:string; done:boolean; source:string; createdBy:string};
export type Ticket = {id:string; title:string; priority:string; status:string; team:string; description:string; context:string; source:string; created:string; replies:Message[]; attachments?:string[]};
export const people:Person[] = [
{id:'rizwan',name:'Rizwan Sammo',title:'Business & Operations Lead',email:'rizwan@netamate.com',tone:0,presence:'Available',role:'Organisation Owner',status:'Active'},
{id:'shahbaj',name:'Shahbaj Tamjid',title:'Chief Executive Officer',email:'shahbaj@netamate.com',tone:1,presence:'Available',role:'Admin',status:'Active'},
{id:'ayesha',name:'Ayesha Rahman',title:'Product Designer',email:'ayesha@example.com',tone:2,presence:'Available',role:'Member',status:'Active'},
{id:'daniel',name:'Daniel Chen',title:'Cloud Engineer',email:'daniel@example.com',tone:3,presence:'Busy',role:'Member',status:'Active'},
{id:'sarah',name:'Sarah Mitchell',title:'Client Success Lead',email:'sarah@example.com',tone:4,presence:'Away',role:'Member',status:'Active'},
{id:'omar',name:'Omar Faruque',title:'Software Engineer',email:'omar@example.com',tone:5,presence:'Available',role:'Member',status:'Active'},
{id:'emma',name:'Emma Wilson',title:'Client Partner',email:'emma@example.com',tone:2,presence:'Offline',role:'Guest',status:'Active',spaces:['sales']}
];
export const spaces:Space[] = [
{id:'engineering',name:'Engineering',description:'Build thoughtfully. Ship confidently. Our home for engineering, infrastructure and the details that make things work.',private:false,type:'Team Space',members:['rizwan','daniel','omar','ayesha'],joined:true},
{id:'matemail',name:'MateMail Project',description:'A better email experience, built together. Product decisions, feedback and release coordination.',private:false,type:'Project Space',members:['rizwan','shahbaj','ayesha','omar'],joined:true},
{id:'sales',name:'Sales & Marketing',description:'Customer conversations, campaigns and our next chapter of growth.',private:false,type:'Team Space',members:['rizwan','shahbaj','sarah','emma'],joined:true},
{id:'founders',name:'Founders',description:'A private space for company strategy and decisions.',private:true,type:'Private Space',members:['rizwan','shahbaj'],joined:true},
{id:'operations',name:'Operations',description:'The systems and processes behind our best work.',private:false,type:'Team Space',members:['rizwan','sarah'],joined:false}
];
export const conversations:Conversation[] = [
{id:'eng-general',name:'general',kind:'channel',space:'engineering',members:['rizwan','daniel','omar','ayesha'],unread:3,favorite:true,description:'Team updates, shared decisions and everything engineering.'},
{id:'eng-devops',name:'devops',kind:'channel',space:'engineering',members:['rizwan','daniel','omar'],unread:2,favorite:true,description:'Infrastructure, deployments and keeping everything healthy.'},
{id:'eng-development',name:'development',kind:'channel',space:'engineering',members:['rizwan','omar','ayesha'],unread:0},
{id:'mail-general',name:'general',kind:'channel',space:'matemail',members:['rizwan','shahbaj','ayesha','omar'],unread:0},
{id:'mail-release',name:'release',kind:'channel',space:'matemail',members:['rizwan','shahbaj','omar'],unread:1,favorite:true,description:'Release plans and the final checks before launch.'},
{id:'mail-bugs',name:'bugs',kind:'channel',space:'matemail',members:['rizwan','omar'],unread:0},
{id:'sales-general',name:'general',kind:'channel',space:'sales',members:['rizwan','sarah','emma'],unread:0},
{id:'sales-campaigns',name:'campaigns',kind:'channel',space:'sales',members:['rizwan','sarah'],unread:2},
{id:'founders-general',name:'strategy',kind:'channel',space:'founders',members:['rizwan','shahbaj'],unread:0,private:true},
{id:'dm-shahbaj',name:'Shahbaj Tamjid',kind:'dm',members:['rizwan','shahbaj'],unread:2,favorite:true},
{id:'dm-ayesha',name:'Ayesha Rahman',kind:'dm',members:['rizwan','ayesha'],unread:1,favorite:true},
{id:'dm-daniel',name:'Daniel Chen',kind:'dm',members:['rizwan','daniel'],unread:0},
{id:'dm-sarah',name:'Sarah Mitchell',kind:'dm',members:['rizwan','sarah'],unread:0},
{id:'group-release',name:'Release coordination',kind:'group',members:['rizwan','ayesha','omar','daniel'],unread:3,favorite:true},
{id:'group-onboarding',name:'Client onboarding',kind:'group',members:['rizwan','sarah','shahbaj'],unread:0},
{id:'dm-omar',name:'Omar Faruque',kind:'dm',members:['rizwan','omar'],unread:0,archived:true}
];
export const files:FileRecord[] = [
{id:'f1',name:'Q4 infrastructure roadmap.pdf',type:'PDF',size:'2.4 MB',owner:'daniel',source:'eng-general',date:'Oct 7, 2026',content:'Q4 INFRASTRUCTURE ROADMAP\nOctober — December 2026\n\n01 / Reliability first\nValidate backup restoration and document recovery ownership.\n\n02 / Deployment confidence\nStandardize health checks and release verification across the product family.\n\n03 / Observability\nBring service health, logs and alerts into one useful view.\n\nPrepared for the Engineering team. Prototype sample document.'},
{id:'f2',name:'MateMail release checklist.md',type:'MD',size:'18 KB',owner:'omar',source:'mail-release',date:'Oct 7, 2026',content:'# MateMail release checklist\n\n✓ Verify tenant isolation\n✓ Review custom domain routing\n✓ Smoke-test mailbox delegation\n□ Confirm release sign-off\n□ Share release notes\n\nOwner: Omar Faruque\nRelease: October 2026'},
{id:'f3',name:'Client onboarding guide.docx',type:'DOCX',size:'840 KB',owner:'sarah',source:'group-onboarding',date:'Oct 6, 2026',content:'CLIENT ONBOARDING\n\nWelcome to NetaMate Solutions.\n\n1. Kickoff and access review\n2. Infrastructure discovery\n3. Priorities and support handover\n4. First-week review\n\nThis is a prototype document preview.'},
{id:'f4',name:'Workspace layout.svg',type:'SVG',size:'32 KB',owner:'ayesha',source:'eng-general',date:'Oct 6, 2026',content:'Workspace navigation concept · desktop layout'},
{id:'f5',name:'October campaign plan.xlsx',type:'XLSX',size:'126 KB',owner:'sarah',source:'sales-campaigns',date:'Oct 5, 2026',content:'Campaign | Owner | Status\nManaged IT awareness | Sarah | In review\nCloud migration guide | Rizwan | Draft\nPartner outreach | Shahbaj | Planned'},
{id:'f6',name:'Product walkthrough.mp4',type:'MP4',size:'18.2 MB',owner:'ayesha',source:'mail-general',date:'Oct 5, 2026',content:'Demo video placeholder. Upload a local video to test playback.'}
];
export const messages:Record<string,Message[]> = {
'eng-general':[
{id:'m1',user:'daniel',text:'Morning team! The Q4 infrastructure roadmap is ready for a final look. I’ve folded in our backup and observability priorities.',time:'09:14',file:'f1',reactions:{'👍':3,'🙌':2},replies:[{id:'r1',user:'omar',text:'The recovery ownership section looks good. I’ll add the service-specific runbooks today.',time:'09:19'},{id:'r2',user:'rizwan',text:'Great. Let’s review the priorities in our sync.',time:'09:23'}],pinned:true},
{id:'m2',user:'ayesha',text:'Thanks Daniel. The new workspace layouts are also ready for review. I’ve kept the navigation quiet and made room for the conversation.',time:'09:27',file:'f4',reactions:{'💙':2}},
{id:'m3',user:'rizwan',text:'Looking good. Let’s make sure the key workflows feel connected before we move into implementation.',time:'09:31',reactions:{'👍':2}},
{id:'m4',user:'omar',text:'Quick update: the MateMail release checklist is ready. Tenant routing and shared mailbox checks are complete. @Rizwan Sammo, could you review the final sign-off?',time:'10:04',replies:[{id:'r3',user:'daniel',text:'Infrastructure checks passed on my side.',time:'10:08'}]},
{id:'m5',user:'shahbaj',text:'Let’s bring any open questions to the engineering sync at 11:30. We can walk through them together.',time:'10:12',reactions:{'👍':4}}
],
'eng-devops':[{id:'d1',user:'daniel',text:'The staging deployment is healthy. I’ve attached the final recovery checklist to the roadmap.',time:'09:40'},{id:'d2',user:'rizwan',text:'Can you check the production deployment failure? The image build passed, but the health check timed out after the restart.',time:'10:05',replies:[{id:'dr1',user:'daniel',text:'I’m checking the startup logs. I’ll share the timeline here.',time:'10:07'}]}],
'dm-shahbaj':[{id:'s1',user:'shahbaj',text:'Morning Rizwan. Do you have a few minutes before the engineering sync?',time:'09:45'},{id:'s2',user:'rizwan',text:'Yes, absolutely. I’m just finishing the release review.',time:'09:48'},{id:'s3',user:'shahbaj',text:'Perfect. I’d like us to align on the client onboarding flow and the priorities for this week.',time:'10:02'},{id:'s4',user:'shahbaj',text:'The team has made good progress. Let’s keep the next release focused and easy to use.',time:'10:03',reactions:{'👍':1}}],
'dm-ayesha':[{id:'a1',user:'ayesha',text:'I’ve updated the workspace concept. The three-panel structure now feels much clearer on a laptop.',time:'09:32',file:'f4'},{id:'a2',user:'rizwan',text:'Nice. Please keep the corner radii restrained and use HemiHead only for the product wordmark.',time:'09:36'},{id:'a3',user:'ayesha',text:'Already included. Ready when you are for a quick design review.',time:'10:06'}],
'group-release':[{id:'g1',user:'omar',text:'Bringing the release discussion into one place. The latest checklist is attached.',time:'09:10',file:'f2'},{id:'g2',user:'daniel',text:'Staging checks are complete. No new infrastructure blockers.',time:'09:20'},{id:'g3',user:'ayesha',text:'I’ll do the final responsive and dark-mode review this morning.',time:'09:24'}],
'mail-release':[{id:'mr1',user:'omar',text:'October release checklist is ready for sign-off. Please add any final notes before our review.',time:'10:04',file:'f2',reactions:{'👍':2}},{id:'mr2',user:'shahbaj',text:'Thanks. Let’s make sure the release notes clearly explain the new delegation flow.',time:'10:16'}]
};
for(const c of conversations) if(!messages[c.id]) messages[c.id]=[{id:c.id+'-1',user:c.members.find(p=>p!=='rizwan')||'shahbaj',text:c.kind==='channel'?'I’ve shared the latest notes for the team. Let’s use this channel to keep decisions and next steps in one place.':'Hi Rizwan, I’ve updated our notes. Let me know when you have a moment to take a look.',time:'Yesterday, 16:20'}];
export const meetings:Meeting[]=[
{id:'meet-1',title:'Engineering sync',date:'2026-10-07',time:'11:30',duration:'30',space:'Engineering',members:['rizwan','daniel','omar','ayesha'],agenda:'Release readiness, infrastructure priorities, and any blockers that need a team decision.'},
{id:'meet-2',title:'MateMail · Release review',date:'2026-10-07',time:'14:00',duration:'45',space:'MateMail Project',members:['rizwan','shahbaj','omar'],agenda:'Review the October release checklist and confirm sign-off.'},
{id:'meet-3',title:'Client experience workshop',date:'2026-10-08',time:'10:00',duration:'60',space:'Sales & Marketing',members:['rizwan','sarah','ayesha'],agenda:'Map the first-week onboarding experience and support handover.'},
{id:'meet-4',title:'Weekly founders catch-up',date:'2026-10-06',time:'15:00',duration:'42',space:'Founders',members:['rizwan','shahbaj'],agenda:'Product priorities, current client work and next steps.',past:true}
];
export const actions:Action[]=[
{id:'act-1',title:'Review MateMail release checklist',assignee:'rizwan',due:'2026-10-07',done:false,source:'mail-release',createdBy:'omar'},
{id:'act-2',title:'Confirm recovery runbook owners',assignee:'rizwan',due:'2026-10-08',done:false,source:'eng-devops',createdBy:'rizwan'},
{id:'act-3',title:'Share onboarding feedback with Sarah',assignee:'rizwan',due:'2026-10-09',done:false,source:'group-onboarding',createdBy:'shahbaj'},
{id:'act-4',title:'Validate staging health checks',assignee:'daniel',due:'2026-10-07',done:true,source:'eng-devops',createdBy:'rizwan'}
];
export const tickets:Ticket[]=[
{id:'1425',title:'Production deployment failure',priority:'High',status:'Open',team:'IT HelpDesk',description:'The image build passed but the health check timed out after restart.',context:'Can you check the production deployment failure? The image build passed, but the health check timed out after the restart.',source:'eng-devops',created:'Oct 7, 10:15',replies:[{id:'t1',user:'daniel',text:'Thanks Rizwan. We’re reviewing the startup logs and will update you here.',time:'10:18'}]},
{id:'1421',title:'VPN connection issue',priority:'Normal',status:'Pending',team:'IT HelpDesk',description:'VPN session disconnects after a few minutes.',context:'No conversation context shared.',source:'dm-daniel',created:'Oct 6, 14:20',replies:[]},
{id:'1418',title:'Mailbox access',priority:'Normal',status:'Resolved',team:'IT HelpDesk',description:'Access restored to the shared support mailbox.',context:'Selected message: Please restore access to our shared mailbox.',source:'dm-shahbaj',created:'Oct 5, 09:30',replies:[]}
];
export const activity=[
{id:'n1',type:'Mentions',user:'omar',title:'mentioned you in #general',text:'Could you review the final release sign-off?',time:'8 min ago',source:'eng-general'},
{id:'n2',type:'Replies',user:'daniel',title:'replied to your thread',text:'Infrastructure checks passed on my side.',time:'12 min ago',source:'eng-devops'},
{id:'n3',type:'Support',user:'daniel',title:'updated support request #1425',text:'We’re reviewing the startup logs.',time:'18 min ago',source:'1425'},
{id:'n4',type:'Meetings',user:'shahbaj',title:'invited you to Engineering sync',text:'Today at 11:30 · 30 minutes',time:'32 min ago',source:'meet-1'},
{id:'n5',type:'Actions',user:'omar',title:'assigned you an action',text:'Review MateMail release checklist',time:'1 hour ago',source:'mail-release'},
{id:'n6',type:'Spaces',user:'sarah',title:'invited you to Operations',text:'Join the team’s operational workspace.',time:'2 hours ago',source:'operations'}
];
export const adminSections=['General','Members','Roles & Permissions','Spaces','Messaging','Meetings','Files','Integrations','Security','Notifications','Audit Logs','Billing & Plan'];
export const personalSections=['Profile','Appearance','Notifications','Audio & Video','Privacy','Security','Accessibility'];
