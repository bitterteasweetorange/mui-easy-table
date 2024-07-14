"use strict";(self.webpackChunkmui_easy_table=self.webpackChunkmui_easy_table||[]).push([[744],{"./src/EasyTable/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CustomColumnManage:()=>CustomColumnManage,Defalut:()=>Defalut,SingleSelected:()=>SingleSelected,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});var ViewWeekRounded=__webpack_require__("./node_modules/.pnpm/@mui+icons-material@5.11.11_@mui+material@5.11.13_@types+react@18.2.8_react@18.2.0/node_modules/@mui/icons-material/esm/ViewWeekRounded.js"),Button=__webpack_require__("./node_modules/.pnpm/@mui+material@5.11.13_@emotion+react@11.11.1_@emotion+styled@11.11.0_@types+react@18.2.8_react-dom@18.2.0_react@18.2.0/node_modules/@mui/material/Button/Button.js"),react=__webpack_require__("./node_modules/.pnpm/react@18.2.0/node_modules/react/index.js"),dist=__webpack_require__("./node_modules/.pnpm/react-utils-ts@0.1.2_react@18.2.0/node_modules/react-utils-ts/dist/index.js"),EasyTable=__webpack_require__("./src/EasyTable/index.tsx"),ColumnManage=__webpack_require__("./src/ColumnManage/index.tsx"),lodash=__webpack_require__("./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/lodash.js"),EasyHead=__webpack_require__("./src/EasyHead/index.tsx");function useTable(props){const{defaultFilter=null,defaultSelected,defaultColumnState,defaultRawData:rawData,...all}=props,{rowKeyPath,getRowDisabled}=all,selectedIO=(0,dist.useIO)(defaultSelected??[]),[checkAll,setCheckAll]=(0,react.useState)(defaultSelected?.length===rawData.length),addSelected=(0,react.useCallback)((row=>{selectedIO.value.length===rawData.length-1&&setCheckAll(!0),selectedIO.onChange(selectedIO.value.concat([row]))}),[selectedIO,rawData.length]),deleteSelected=(0,react.useCallback)((row=>{1===selectedIO.value.length&&setCheckAll(!1),selectedIO.onChange(selectedIO.value.filter((r=>!(0,lodash.isEqual)(r,row))))}),[selectedIO]),addAllSelected=(0,react.useCallback)((()=>{selectedIO.onChange((pre=>[...pre,...rawData.filter((r=>!getRowDisabled?.(r)&&!pre.includes(r)))])),setCheckAll(!0)}),[rawData,getRowDisabled,selectedIO,setCheckAll]),deleteAllSelected=(0,react.useCallback)((()=>{selectedIO.onChange((pre=>pre.filter((r=>getRowDisabled?.(r))))),setCheckAll(!1)}),[getRowDisabled,selectedIO,setCheckAll]),switchSelected=(0,react.useCallback)((row=>{selectedIO.onChange([row])}),[selectedIO]),rawDataIO=(0,dist.useIO)(rawData),addRow=(0,react.useCallback)((row=>{rawDataIO.onChange((pre=>[...pre,row]))}),[rawDataIO]),[filter,setFilter]=(0,react.useState)(defaultFilter),data=(0,react.useMemo)((()=>{if((0,lodash.isNil)(filter))return rawDataIO.value;return rawDataIO.value.filter((row=>{let valid=!0;return Object.entries(filter).forEach((item=>{const[key,value]=item;if(void 0===value)return;const realValue=(0,lodash.get)(row,key);Array.isArray(value)?(valid=value.includes(realValue),console.log(valid,value,realValue)):valid=realValue===value})),valid}))}),[filter,rawDataIO.value]),deleteRow=(0,react.useCallback)((index=>{const deletedRow=rawDataIO.value[index];selectedIO.value.map((row=>(0,lodash.get)(row,rowKeyPath))).includes((0,lodash.get)(deletedRow,rowKeyPath))&&selectedIO.onChange(selectedIO.value.filter((row=>(0,lodash.get)(row,rowKeyPath)!==(0,lodash.get)(deletedRow,rowKeyPath)))),rawDataIO.onChange(rawDataIO.value.filter(((_,i)=>i!==index)))}),[rawDataIO,rowKeyPath,selectedIO]),updateRow=(0,react.useCallback)(((index,row)=>{selectedIO.value.map((selectedRow=>(0,lodash.get)(selectedRow,rowKeyPath))).includes((0,lodash.get)(row,rowKeyPath))&&selectedIO.onChange(selectedIO.value.map((oldRow=>(0,lodash.get)(oldRow,rowKeyPath)===(0,lodash.get)(row,rowKeyPath)?row:oldRow))),rawDataIO.onChange(rawDataIO.value.map(((r,i)=>i===index?row:r)))}),[rawDataIO,rowKeyPath,selectedIO]),[columnState,setColumnState]=(0,react.useState)((()=>defaultColumnState.map((col=>({path:col.path,width:col.width??EasyHead.$7,hidden:col.hidden??!1}))))),updateColumnOrder=(0,react.useCallback)(((startIndex,endIndex)=>{setColumnState((pre=>{const result=Array.from(pre),[removed]=result.splice(startIndex,1);return result.splice(endIndex,0,removed),result}))}),[]),updateColumnHidden=(0,react.useCallback)(((path,nextHidden)=>{setColumnState((pre=>{const result=Array.from(pre),index=result.findIndex((col=>(0,lodash.isEqual)(col.path,path)));return result[index].hidden=nextHidden,result}))}),[]),updateColumnWidth=(0,react.useCallback)(((path,nextWidth)=>{setColumnState((pre=>{const result=Array.from(pre),index=result.findIndex((col=>(0,lodash.isEqual)(col.path,path)));return result[index].width=nextWidth,result}))}),[]);return{...all,resetRawData:rawDataIO.onChange,filter,setFilter,data,selected:selectedIO.value,columnState,updateColumnOrder,updateColumnHidden,updateColumnWidth,handleSelect:{add:addSelected,delete:deleteSelected,switch:switchSelected,addAll:addAllSelected,deleteAll:deleteAllSelected},handleData:{add:addRow,delete:deleteRow,update:updateRow},checkAll}}try{useTable.displayName="useTable",useTable.__docgenInfo={description:"",displayName:"useTable",props:{defaultRawData:{defaultValue:null,description:"",name:"defaultRawData",required:!0,type:{name:"Row[]"}},defaultSelected:{defaultValue:null,description:"",name:"defaultSelected",required:!1,type:{name:"Row[]"}},defaultColumnState:{defaultValue:null,description:"",name:"defaultColumnState",required:!0,type:{name:"DefaultColumnItemState<Row>[]"}},defaultFilter:{defaultValue:null,description:"",name:"defaultFilter",required:!1,type:{name:"FieldValues | null"}},rowKeyPath:{defaultValue:null,description:"declare the key path of row",name:"rowKeyPath",required:!0,type:{name:"string"}},getRowDisabled:{defaultValue:null,description:"",name:"getRowDisabled",required:!1,type:{name:"((row: Row) => boolean)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/useTable.tsx#useTable"]={docgenInfo:useTable.__docgenInfo,name:"useTable",path:"src/useTable.tsx#useTable"})}catch(__react_docgen_typescript_loader_error){}var esm=__webpack_require__("./node_modules/.pnpm/@faker-js+faker@8.0.2/node_modules/@faker-js/faker/dist/esm/index.mjs"),CheckOutlined=__webpack_require__("./node_modules/.pnpm/@mui+icons-material@5.11.11_@mui+material@5.11.13_@types+react@18.2.8_react@18.2.0/node_modules/@mui/icons-material/esm/CheckOutlined.js"),ClearRounded=__webpack_require__("./node_modules/.pnpm/@mui+icons-material@5.11.11_@mui+material@5.11.13_@types+react@18.2.8_react@18.2.0/node_modules/@mui/icons-material/esm/ClearRounded.js"),EditOutlined=__webpack_require__("./node_modules/.pnpm/@mui+icons-material@5.11.11_@mui+material@5.11.13_@types+react@18.2.8_react@18.2.0/node_modules/@mui/icons-material/esm/EditOutlined.js"),DeleteOutline=__webpack_require__("./node_modules/.pnpm/@mui+icons-material@5.11.11_@mui+material@5.11.13_@types+react@18.2.8_react@18.2.0/node_modules/@mui/icons-material/esm/DeleteOutline.js"),LoadingButton=__webpack_require__("./node_modules/.pnpm/@mui+lab@5.0.0-alpha.134_@emotion+react@11.11.1_@emotion+styled@11.11.0_@mui+material@5.11.13_j5wnlp3oeampzi6pjauevv5yi4/node_modules/@mui/lab/LoadingButton/LoadingButton.js"),Tooltip=__webpack_require__("./node_modules/.pnpm/@mui+material@5.11.13_@emotion+react@11.11.1_@emotion+styled@11.11.0_@types+react@18.2.8_react-dom@18.2.0_react@18.2.0/node_modules/@mui/material/Tooltip/Tooltip.js"),IconButton=__webpack_require__("./node_modules/.pnpm/@mui+material@5.11.13_@emotion+react@11.11.1_@emotion+styled@11.11.0_@types+react@18.2.8_react-dom@18.2.0_react@18.2.0/node_modules/@mui/material/IconButton/IconButton.js"),jsx_runtime=__webpack_require__("./node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js");const mockData=new Array(100).fill(null).map(((_,index)=>(esm.We.seed(index),{id:index,name:{lastName:esm.We.person.lastName(),firstName:esm.We.person.firstName()},money:index%5==0?null:esm.We.number.int({min:1e3,max:2e4}),isAdmin:esm.We.person.firstName().includes("a")&&index%2==0,job:esm.We.person.jobType(),group:index%3==0?"ONE":index%3==1?"TWO":"THREE"}))),defaultColumnState=[{path:"id"},{path:"name.firstName",width:200},{path:"isAdmin"},{path:"money",width:150},{path:"name",width:800},{path:"job"},{path:"group"},{path:"name.lastName",hidden:!0,width:200},{path:"actions",width:150}],columns=[{path:"id",headerName:"ID"},{path:"name.firstName",headerName:"FirstName"},{path:"isAdmin",headerName:"is admin",render:val=>val?(0,jsx_runtime.jsx)(CheckOutlined.Z,{color:"success"}):(0,jsx_runtime.jsx)(ClearRounded.Z,{color:"error"}),filterSetting:{type:"singleSelect",options:[{value:!0,label:(0,jsx_runtime.jsx)(CheckOutlined.Z,{color:"success"})},{value:!1,label:(0,jsx_runtime.jsx)(ClearRounded.Z,{color:"error"})}]}},{path:"job",headerName:"Job"},{path:"money",headerName:"Money",align:"right",render:"money",sortable:!0,sum:!0},{path:"name",headerName:"Name",render:value=>(value.firstName||"")+" "+value.lastName},{path:"name.lastName",headerName:"LastName"},{path:"group",headerName:"Group",filterSetting:{type:"multiSelect",options:[{label:"One",value:"ONE"},{label:"TWO",value:"TWO"},{label:"THREE",value:"THREE"}]}},{path:"actions",headerName:"Actions",align:"right",render:(_,row,index,useTableReturn)=>1!==index&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(UpdateRow,{disabled:0===index,updateRecord:useTableReturn.handleData.update,row,index}),(0,jsx_runtime.jsx)(DeleteRow,{deleteRecord:useTableReturn.handleData.delete,index})]})}];function UpdateRow({index,row,updateRecord,disabled}){const[loading,setLoading]=react.useState(!1);return loading?(0,jsx_runtime.jsx)(LoadingButton.Z,{loading:!0}):(0,jsx_runtime.jsx)(Tooltip.Z,{title:"update firstname as Momo",children:(0,jsx_runtime.jsx)(IconButton.Z,{disabled,color:"success",onClick:async e=>{e.stopPropagation(),setLoading(!0),await sleep(1e3),setLoading(!1),updateRecord(index,{...row,name:{firstName:"Momo",lastName:row.name.lastName}})},children:(0,jsx_runtime.jsx)(EditOutlined.Z,{})})})}function DeleteRow({index,deleteRecord}){const[loading,setLoading]=react.useState(!1);return loading?(0,jsx_runtime.jsx)(LoadingButton.Z,{loading:!0}):(0,jsx_runtime.jsx)(Tooltip.Z,{title:"update firstname as Momo",children:(0,jsx_runtime.jsx)(IconButton.Z,{color:"warning",onClick:async e=>{e.stopPropagation(),setLoading(!0),await sleep(1e3),setLoading(!1),deleteRecord(index)},children:(0,jsx_runtime.jsx)(DeleteOutline.Z,{})})})}function sleep(ms){return new Promise((resolve=>setTimeout(resolve,ms)))}const index_stories={title:"EasyTable",component:EasyTable.R},Defalut=()=>{const useTableReturn=useTable({defaultRawData:mockData,rowKeyPath:"id",defaultSelected:[mockData[0],mockData[2]],getRowDisabled:row=>2===row.id||3===row.id,defaultColumnState,defaultFilter:{isAdmin:!0}}),{filter,selected}=useTableReturn;return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(EasyTable.R,{setting:!0,height:"calc(100vh - 120px)",selectionMode:"multiple",useTableReturn,columns,isRowEqual:(a,b)=>a.id===b.id}),JSON.stringify(filter),selected.map((user=>user.name.firstName)).join(", ")]})},SingleSelected=()=>{const useTableReturn=useTable({rowKeyPath:"id",defaultRawData:mockData,defaultSelected:[mockData[0]],defaultColumnState});return(0,jsx_runtime.jsx)(EasyTable.R,{height:"calc(100vh - 34px)",useTableReturn,columns,selectionMode:"single"})};SingleSelected.displayName="SingleSelected";const CustomColumnManage=()=>{const openIO=(0,dist.useIO)(!1),anchorRef=react.useRef(null),useTableReturn=useTable({defaultRawData:mockData,rowKeyPath:"id",defaultSelected:[mockData[0],mockData[2]],getRowDisabled:row=>2===row.id||3===row.id,defaultColumnState}),{columnState}=useTableReturn,hideColumnsLength=columnState.filter((col=>col.hidden)).length;return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[void x.forEach((p=>{if(2===p)return!0}))+"",(0,jsx_runtime.jsx)(Button.Z,{variant:hideColumnsLength?"contained":"outlined",onClick:()=>{openIO.onChange((state=>!state))},ref:anchorRef,startIcon:(0,jsx_runtime.jsx)(ViewWeekRounded.Z,{}),children:"Columns"}),(0,jsx_runtime.jsx)(ColumnManage.$,{columns,openIO,anchorRef,...useTableReturn}),(0,jsx_runtime.jsx)(EasyTable.R,{setting:!0,height:"calc(100vh - 120px)",selectionMode:"multiple",useTableReturn,columns,isRowEqual:(a,b)=>a.id===b.id})]})},x=[1,2];Defalut.parameters={...Defalut.parameters,docs:{...Defalut.parameters?.docs,source:{originalSource:"() => {\n  const useTableReturn = useTable<MockShape, MockFilter>({\n    defaultRawData: mockData,\n    rowKeyPath: 'id',\n    defaultSelected: [mockData[0], mockData[2]],\n    getRowDisabled: row => row.id === 2 || row.id === 3,\n    defaultColumnState,\n    defaultFilter: {\n      isAdmin: true\n    }\n  });\n  const {\n    filter,\n    selected\n  } = useTableReturn;\n  return <>\n      <EasyTable<MockShape, MockFilter> setting height={`calc(100vh - 120px)`} selectionMode=\"multiple\" useTableReturn={useTableReturn} columns={columns} isRowEqual={(a, b) => a.id === b.id} />\n      {JSON.stringify(filter)}\n      {selected.map(user => user.name.firstName).join(', ')}\n    </>;\n}",...Defalut.parameters?.docs?.source}}},SingleSelected.parameters={...SingleSelected.parameters,docs:{...SingleSelected.parameters?.docs,source:{originalSource:'() => {\n  const useTableReturn = useTable<MockShape>({\n    rowKeyPath: \'id\',\n    defaultRawData: mockData,\n    defaultSelected: [mockData[0]],\n    defaultColumnState\n  });\n  return <EasyTable<MockShape> height="calc(100vh - 34px)" useTableReturn={useTableReturn} columns={((columns as unknown) as EasyColumnProps<MockShape>[])} selectionMode="single" />;\n}',...SingleSelected.parameters?.docs?.source}}},CustomColumnManage.parameters={...CustomColumnManage.parameters,docs:{...CustomColumnManage.parameters?.docs,source:{originalSource:"() => {\n  const openIO = useIO(false);\n  const anchorRef = React.useRef<HTMLButtonElement>(null);\n  const useTableReturn = useTable<MockShape>({\n    defaultRawData: mockData,\n    rowKeyPath: 'id',\n    defaultSelected: [mockData[0], mockData[2]],\n    getRowDisabled: row => row.id === 2 || row.id === 3,\n    defaultColumnState\n  });\n  const {\n    columnState\n  } = useTableReturn;\n  const hideColumnsLength = columnState.filter(col => col.hidden).length;\n  return <>\n      {m() + ''}\n      <Button variant={hideColumnsLength ? 'contained' : 'outlined'} onClick={() => {\n      openIO.onChange(state => !state);\n    }} ref={anchorRef} startIcon={<ViewWeekRounded />}>\n        Columns\n      </Button>\n      <ColumnManage columns={columns} openIO={openIO} anchorRef={anchorRef} {...useTableReturn} />\n      <EasyTable<MockShape> setting height={`calc(100vh - 120px)`} selectionMode=\"multiple\" useTableReturn={useTableReturn} columns={((columns as unknown) as EasyColumnProps<MockShape>[])} isRowEqual={(a, b) => a.id === b.id} />\n    </>;\n}",...CustomColumnManage.parameters?.docs?.source}}};const __namedExportsOrder=["Defalut","SingleSelected","CustomColumnManage"]}}]);