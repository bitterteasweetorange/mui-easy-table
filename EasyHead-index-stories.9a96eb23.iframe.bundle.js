"use strict";(self.webpackChunkmui_easy_table=self.webpackChunkmui_easy_table||[]).push([[523],{"./src/EasyHead/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _mui_material__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/.pnpm/@mui+material@5.11.13_@emotion+react@11.11.1_@emotion+styled@11.11.0_@types+react@18.2.8_react-dom@18.2.0_react@18.2.0/node_modules/@mui/material/Box/Box.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/react@18.2.0/node_modules/react/index.js"),react_utils_ts__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/react-utils-ts@0.1.2_react@18.2.0/node_modules/react-utils-ts/dist/index.js"),___WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/EasyHead/index.tsx"),_EasyTable__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/EasyTable/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"component/EasyHead",component:___WEBPACK_IMPORTED_MODULE_2__.zg},Default=()=>{const sortIO=(0,react_utils_ts__WEBPACK_IMPORTED_MODULE_1__.useIO)({path:"age",direction:"asc"}),checkedIO=(0,react_utils_ts__WEBPACK_IMPORTED_MODULE_1__.useIO)(!1),[columnState,setColumnState]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([{path:"id",width:150,hidden:!1},{path:"name",width:250,hidden:!1},{path:"age",width:350,hidden:!1}]),updateColumnHidden=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(((path,nextHidden)=>{setColumnState((pre=>{const result=Array.from(pre),index=result.findIndex((col=>col.path===path));return result[index].hidden=nextHidden,result}))}),[]),updateColumnWidth=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(((path,nextWidth)=>{setColumnState((pre=>{const result=Array.from(pre),index=result.findIndex((col=>col.path===path));return result[index].width=nextWidth,result}))}),[]),openIO=(0,react_utils_ts__WEBPACK_IMPORTED_MODULE_1__.useIO)(!1),anchorRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_mui_material__WEBPACK_IMPORTED_MODULE_5__.Z,{sx:{display:"grid",gridTemplateColumns:`${_EasyTable__WEBPACK_IMPORTED_MODULE_3__.I}px auto auto auto`,justifyContent:"start"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(___WEBPACK_IMPORTED_MODULE_2__.zg,{anchorRef,openIO,setting:!0,columns:[{path:"id",headerName:"ID"},{path:"name",headerName:"Name",align:"center"},{path:"age",headerName:"Age",sortable:!0,align:"right"}],sortIO,checkedIO,updateColumnHidden,updateColumnWidth,columnState})})};Default.displayName="Default",Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"() => {\n  const sortIO = useIO<EasyHeadSortProps<Shape>>({\n    path: 'age',\n    direction: 'asc'\n  });\n  const checkedIO = useIO<boolean>(false);\n  const [columnState, setColumnState] = useState<ColumnState<Shape>>([{\n    path: 'id',\n    width: 150,\n    hidden: false\n  }, {\n    path: 'name',\n    width: 250,\n    hidden: false\n  }, {\n    path: 'age',\n    width: 350,\n    hidden: false\n  }]);\n  const updateColumnHidden: UseTableReturn<Shape>['updateColumnHidden'] = useCallback((path, nextHidden) => {\n    setColumnState(pre => {\n      const result = Array.from(pre);\n      const index = result.findIndex(col => col.path === path);\n      result[index].hidden = nextHidden;\n      return result;\n    });\n  }, []);\n  const updateColumnWidth: UseTableReturn<Shape>['updateColumnWidth'] = useCallback((path, nextWidth) => {\n    setColumnState(pre => {\n      const result = Array.from(pre);\n      const index = result.findIndex(col => col.path === path);\n      result[index].width = nextWidth;\n      return result;\n    });\n  }, []);\n  const openIO = useIO(false);\n  const anchorRef = useRef<HTMLLIElement>(null);\n  return <Box sx={{\n    display: 'grid',\n    gridTemplateColumns: `${CHECKBOX_WIDTH}px auto auto auto`,\n    justifyContent: 'start'\n  }}>\n      <EasyHead<Shape> anchorRef={anchorRef} openIO={openIO} setting columns={[{\n      path: 'id',\n      headerName: 'ID'\n    }, {\n      path: 'name',\n      headerName: 'Name',\n      align: 'center'\n    }, {\n      path: 'age',\n      headerName: 'Age',\n      sortable: true,\n      align: 'right'\n    }]} sortIO={sortIO} checkedIO={checkedIO} updateColumnHidden={updateColumnHidden} updateColumnWidth={updateColumnWidth} columnState={columnState} />\n    </Box>;\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]}}]);