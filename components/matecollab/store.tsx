'use client';
import React,{createContext,useContext,useEffect,useState} from 'react';
import * as D from '@/lib/matecollab/data';
import { toast } from 'sonner';
export type Route={module:string;id?:string;tab?:string};
export type Overlay={type:string;id?:string;source?:string;message?:D.Message};
export type CallState={title:string;mode:string;joined:boolean;minimized:boolean;mic:boolean;camera:boolean;share:boolean;hand:boolean;panel:string;issue:boolean};
export function useStored<T>(key:string,initial:T){const [value,setValue]=useState<T>(initial);const [ready,setReady]=useState(false);useEffect(()=>{try{const stored=localStorage.getItem('matecollab-'+key);if(stored)setValue(JSON.parse(stored))}catch{}setReady(true)},[key]);useEffect(()=>{if(ready)try{localStorage.setItem('matecollab-'+key,JSON.stringify(value))}catch{}},[value,ready,key]);return [value,setValue] as const}
function useAppState(){
const [route,setRoute]=useState<Route>({module:'home'});
const [conversations,setConversations]=useStored('conversations',D.conversations);
const [spaces,setSpaces]=useStored('spaces',D.spaces);
const [messages,setMessages]=useStored('messages',D.messages);
const [files,setFiles]=useStored('files',D.files);
const [meetings,setMeetings]=useStored('meetings',D.meetings);
const [actions,setActions]=useStored('actions',D.actions);
const [tickets,setTickets]=useStored('tickets',D.tickets);
const [members,setMembers]=useStored('members',D.people);
const [prefs,setPrefs]=useStored<Record<string,any>>('preferences',{theme:'Light',density:'Comfortable',presence:'Available',name:'Rizwan Sammo',title:'Business & Operations Lead',timezone:'Asia/Dhaka',org:'NetaMate Solutions',readReceipts:true,desktop:true,mentions:true,replies:true,reminders:true});
const [readActivity,setReadActivity]=useStored<string[]>('read-activity',[]);
const [overlay,setOverlay]=useState<Overlay|null>(null);
const [panel,setPanel]=useState<Overlay|null>(null);
const [confirmation,setConfirmation]=useState<{title:string;description:string;action:()=>void}|null>(null);
const [call,setCall]=useState<CallState|null>(null);
const [sidebar,setSidebar]=useState(true);
const [mobileSidebar,setMobileSidebar]=useState(false);
const [sidebarWidth,setSidebarWidth]=useStored('sidebar-width',274);
const [query,setQuery]=useState('');
const [searchType,setSearchType]=useState('All');
const [draftQuote,setDraftQuote]=useState('');
const [demoRole,setDemoRole]=useState('Owner');
useEffect(()=>{const load=()=>{const p=decodeURIComponent(location.hash.replace(/^#\/?/, '')).split('/');if(p[0])setRoute({module:p[0],id:p[1],tab:p[2]})};load();window.addEventListener('hashchange',load);return()=>window.removeEventListener('hashchange',load)},[]);
const navigate=(module:string,id?:string,tab?:string)=>{setRoute({module,id,tab});location.hash='/'+[module,id,tab].filter(Boolean).map(x=>encodeURIComponent(x!)).join('/');setPanel(null);setMobileSidebar(false);if(id)setConversations(old=>old.map(c=>c.id===id?{...c,unread:0}:c))};
useEffect(()=>{const media=window.matchMedia('(prefers-color-scheme: dark)');const apply=()=>{document.documentElement.classList.toggle('dark',prefs.theme==='Dark'||(prefs.theme==='System'&&media.matches));document.documentElement.dataset.density=prefs.density;document.documentElement.dataset.reducedMotion=prefs.reducedMotion?'true':'false';document.documentElement.style.fontSize=(prefs.textScale||'16')+'px'};apply();media.addEventListener('change',apply);return()=>media.removeEventListener('change',apply)},[prefs]);
useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();setOverlay({type:'search'})}if(e.key==='Escape')setPanel(null)};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[]);
const updatePref=(k:string,v:any)=>setPrefs(old=>({...old,[k]:v}));
const sendMessage=(source:string,text:string,threadId?:string,file?:string)=>{const m:D.Message={id:'msg-'+Date.now(),user:'rizwan',text,time:new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}),file,quote:threadId?undefined:draftQuote};setMessages(old=>({...old,[source]:threadId?(old[source]||[]).map(p=>p.id===threadId?{...p,replies:[...(p.replies||[]),m]}:p):[...(old[source]||[]),m]}));setDraftQuote('')};
const updateMessage=(source:string,id:string,fn:(m:D.Message)=>D.Message)=>setMessages(old=>({...old,[source]:(old[source]||[]).map(m=>m.id===id?fn(m):{...m,replies:m.replies?.map(r=>r.id===id?fn(r):r)})}));
const react=(source:string,m:D.Message,emoji='👍')=>updateMessage(source,m.id,x=>{const has=x.reacted?.includes(emoji);return {...x,reactions:{...x.reactions,[emoji]:Math.max(0,(x.reactions?.[emoji]||0)+(has?-1:1))},reacted:has?x.reacted?.filter(r=>r!==emoji):[...(x.reacted||[]),emoji]}});
const deleteMessage=(source:string,id:string)=>setConfirmation({title:'Delete this message?',description:'This removes the message and its replies from this prototype conversation. This cannot be undone.',action:()=>{setMessages(old=>({...old,[source]:(old[source]||[]).filter(m=>m.id!==id).map(m=>({...m,replies:m.replies?.filter(r=>r.id!==id)}))}));setPanel(null);toast.success('Message deleted')}});
const startCall=(title:string,mode='video')=>{setPanel(null);setCall({title,mode,joined:mode==='huddle',minimized:mode==='huddle',mic:true,camera:mode==='video',share:false,hand:false,panel:'',issue:false})};
const confirm=(title:string,description:string,action:()=>void)=>setConfirmation({title,description,action});
const guestConversationIds=conversations.filter(c=>c.space==='sales').map(c=>c.id);
const guestMode=demoRole==='Guest';
return {route,navigate,conversations:guestMode?conversations.filter(c=>guestConversationIds.includes(c.id)):conversations,setConversations,spaces:guestMode?spaces.filter(sp=>sp.id==='sales'):spaces,setSpaces,messages:guestMode?Object.fromEntries(Object.entries(messages).filter(([id])=>guestConversationIds.includes(id))):messages,setMessages,files:guestMode?files.filter(f=>guestConversationIds.includes(f.source)):files,setFiles,meetings:guestMode?meetings.filter(m=>m.space==='Sales & Marketing'):meetings,setMeetings,actions:guestMode?actions.filter(a=>guestConversationIds.includes(a.source)):actions,setActions,tickets:guestMode?tickets.filter(t=>guestConversationIds.includes(t.source)):tickets,setTickets,members:guestMode?members.filter(m=>['rizwan','sarah','emma','shahbaj'].includes(m.id)):members,setMembers,prefs,updatePref,readActivity,setReadActivity,overlay,setOverlay,panel,setPanel,confirmation,setConfirmation,call,setCall,sidebar,setSidebar,mobileSidebar,setMobileSidebar,sidebarWidth,setSidebarWidth,query,setQuery,searchType,setSearchType,draftQuote,setDraftQuote,demoRole,setDemoRole,sendMessage,updateMessage,react,deleteMessage,startCall,confirm};
}
export type AppStore=ReturnType<typeof useAppState>;
const Context=createContext<AppStore|null>(null);
export function AppProvider({children}:{children:React.ReactNode}){const value=useAppState();return <Context.Provider value={value}>{children}</Context.Provider>}
export function useApp(){return useContext(Context)!}
