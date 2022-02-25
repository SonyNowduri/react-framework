import React, { useEffect, useRef, useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core'
import { AntSwitch } from '../../../constants/dummyData'
import { Link } from 'react-router-dom'
import { convertDate } from '../createButton,filters/dateConverter'
import { getAdminUserService } from '../../../services/general/general.service'
import { assigneCallQueueService } from '../../../services/general/callQueue.service'
import { useDispatch } from 'react-redux'
import { getOpportunityDetailsService } from '../../../services/general/opportunity.service'
import {
  getClinicalAdministrationDetailsAction,
  getOfficeRestrictionDetailsAction,
  getOpportunityDetailsAction,
  setUserInfo
} from '../../../redux/actions/actions'
import { useHistory } from 'react-router'
import { getData, storeData } from '../../../utils/asyncKeyStorage'
import { questionBankTableRows } from '../../../constants/AdminTableData/QuestionBankManagementTableData'
import { getProviderProfileApi } from '../../../services/general/patientAndProvider'
import { set } from 'react-hook-form'
import { Pagination } from '@material-ui/lab'

const useStyles = makeStyles({
  root: {
    width: '100%',
    border: '1px solid #D5D5D5',
    borderRadius: '5px'
  },
  container: {
    minHeight: 200,
    maxHeight: 480,
    '&::-webkit-scrollbar': {
      width: '0.4em',
      backgroundColor: '#D5D5D5',
      borderRadius: '5px'
      // position:"absolute"
    },
    '&::-webkit-scrollbar-track': {
      width: '0.2em'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#F6F6F6',
      outline: '1px solid none',
      borderRadius: '5px',
      width: '0.2em'
      // position: "absolute"
    }
  },
  vl: {
    borderLeft: '1px solid #D5D5D5',
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontWeight: 'normal',
    color: 'red',
    align: 'center',
    paddingLeft: '2px'
  },
  tableCell: {
    padding: '4px',
    paddingLeft: '7px',
    borderLeft: '1px solid #D5D5D5',
    height: '32px',
    maxWidth: '120px',
    minWidth: '50px',
    verticalAlign: 'top',
    textAlign: 'left',
    wordBreak: 'break-all'
    // overflow:'auto'

    // display:'flex',
    // alignSelf:'flex-start'
    // position:'relative'
  },
  urgentTextColor: {
    color: '#FF4141',
    align: 'top',
    position: 'relative',
    bottom: '10px',
    verticalAlign: 'top',
    textAlign: 'left',
    alignSelf: 'stretch'
  },
  openTextColor: {
    color: '#009A34',
    align: 'top',
    position: 'relative',
    bottom: '10px',
    verticalAlign: 'top',
    textAlign: 'left',
    alignSelf: 'stretch'
  },
  inputTypeScore: {
    margin: '3px'
  },
  options: {
    margin: '6px'
  },
  selectedBtn: {
    background: 'green',
    color: 'white',
    marginLeft: '20px',
    marginTop: '10px'
  },
  unSelectedBtn: {
    marginLeft: '20px',
    marginTop: '10px'
  },
  answerOptions: {
    marginBottom: '6px'
  },
  recordsData: {
    paddingLeft: '10px',
  },
  menuPaper: {
    maxHeight: 330
    // maxHeight: 100
  }
})

const Tables = (props) => {
  console.log(props, 'props from table')
  const [adminUser, setAdminUser] = useState({})
  const dispatch = useDispatch()
  const history = useHistory()
  const listenScrollRef = useRef()
  const {
    columns,
    rowsData,
    from,
    selectedCheckBox,
    onClickRefreshIcon,
    lastPage,
    noOfPages,
    handlePagination,
    totalRecords,
    typeOfTable
  } = props
  let dropIntiName

  // const name = rowsData?.map((each) => {
  //   // console.log(each)
  //   each.assignedTo?.map((val) => {
  //     if (val?.id === '1') {
  //       dropIntiName = val?.id
  //     }
  //   })
  // })

  useEffect(() => {
    if (from === 'callQueue') {
      getAdminUser()
    }
  }, [])

  const getAdminUser = async (page) => {
    let adminUserResp = await getAdminUserService(page).then((resp) =>
      resp?.success
        ? resp?.viewModel
        : console.log('error while fetchingt the user  list')
    )
    let existedArray = adminUser?.content
    if (existedArray && adminUserResp?.content) {
      // adminUserResp?.content.forEach((item) => {
      //   if (item.id === existedArray)
      //     existedArray.push(item)
      // })

      let array3 = existedArray.concat(adminUserResp?.content);
      array3 = [...new Set([...existedArray, ...adminUserResp?.content])]
      // existedArray = [...existedArray, ...adminUserResp?.content]
      console.log(existedArray, "existedArray")
      adminUserResp.content = array3
    }

    setAdminUser(adminUserResp)
  }

  const setOpportunityDetailsToReducer = async (opportunity_id, userId) => {
    console.log('DATAFROMPARAMS', opportunity_id, userId)
    const opportunityDetailsResp = await getOpportunityDetailsService(
      opportunity_id
    )
      .then(async (resp) => {
        if (resp?.success) {
          await dispatch(getOpportunityDetailsAction(resp?.viewModel))
          console.log(
            'GETOPPORTUNITY',
            dispatch(getOpportunityDetailsAction(resp?.viewModel))
          )
        } else {
          console.log('errro while fetchin the opportunity data')
        }
      })
      .then(async (resp) => {
        console.log('push', opportunity_id, userId)
        history.push(
          `/pcc-dashboard/opportunity/${opportunity_id}/opportunity/${userId}`
        )
      })
      .catch((err) => console.log(err, 'err'))
  }

  const [toggleValue, setToggleValue] = useState({
    id: '',
    status: ''
  })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [optionsScore, setOptionsScore] = useState([])
  const [questionId, setQuestionId] = useState('')
  const [beforeRefresh, setBeforeRefresh] = useState(rowsData)
  const [dropDownName, setDropDownName] = useState(dropIntiName)
  const [selectedIndex, setSelectedIndex] = useState([])
  const classes = useStyles()
  const [checked, setChecked] = useState()
  const [supportTicket, setSupportTicket] = useState(rowsData)
  const [inputScore, setInputScore] = useState('')
  const [pageIndex, setPageIndex] = useState(1)
  const [questionsObj, setQuestionsObj] = useState([])
  const [toggle, setToggle] = useState([])
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(event.target.value)
  }

  // update Size of the table
  const handleChangeRowsPerPage = (event) => {
    props.handleSize(event.target.value)
  }

  const handleChange = (event, index, row) => {
    const name = row?.questionId
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected)

    // setSelectedIndex([...selectedIndex, index])
    setQuestionId(row?.questionId)
    // setOptions(row?.score)
    for (const [key, value] of Object.entries(row?.score)) {
      console.log(key, value)
      setOptionsScore({ ...optionsScore, [value]: '' })
    }
  }


  // TODO: send the updated data to redux by httign api
  const sendToProviderDetails = async (id) => {
    const infoProvider = await getProviderProfileApi(id).then((res) => {
      if (res.success) {
        console.log(res, 'res')
        dispatch(setUserInfo(res?.viewModel))
        dispatch(getClinicalAdministrationDetailsAction(res?.viewModel))
        dispatch(getOfficeRestrictionDetailsAction(res?.viewModel))
        history.push(`/admin/create-modify-provider/${id}/provider`)
      }
    })
    const res = infoProvider?.viewModel
  }

  // update call queue assignedd
  const handleDropDownChange = async (e, id) => {
    console.log(
      e.target.value,
      id,
      'value?.id, e, value.opportunity_id'
    )
    setDropDownName(rowsData)
    const PathList = {
      call: 'operations/api/call-me-back',
      task: 'patient/api/patient-task'
    }
    const payload = {
      "assignedTo": e.target.value,
      "id":id 
    }
    await assigneCallQueueService(PathList[typeOfTable],payload).then((resp) =>
      resp?.success ? resp.success : console.log('failed to update')
    )
  }

  // update scollabel content 
  const onScrollUserList = async (event) => {
    console.log("scrolling", event.target);
    // console.log("event", event);
    if (listenScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = event.target;
      if (scrollTop + clientHeight === scrollHeight) {
        if (!adminUser?.last) {
          getAdminUser(adminUser?.pageable?.pageNumber + 1)
        }
      }
    }
  }

  const onPccSupportToggleChange = (e, index) => {
    console.log(index, 'val', e, 'e')
    const toggleIndex = supportTicket[index + 1]
    const valueToggle = toggleIndex.status
    const toggledValue = e.target.checked === true ? 'Open' : 'Close'
  }

  const handleClick = (e, index) => {
    setSelectedIndex(index)
    console.log(index, selectedIndex)
  }

  const [scoresList, setScoresList] = useState({
    scores: {},
    id: ''
  })



  //  to handle the score entered in the input feild
  const handleInputEnterScore = (e, index, key) => {
    setOptionsScore({ ...optionsScore, [key]: e.target.value })
  }


  // to handle the save button in the question mapping
  const onClickSaveBtn = (e, index, name) => {
    // setToggle(true)
    setQuestionsObj({
      ...questionsObj,
      [questionId]: {
        questionId: questionId,
        score: optionsScore
      }
    })
    setOptionsScore('')
  }

  console.log(questionsObj)
  storeData('questionMapping', JSON.stringify(questionsObj))

  const categoryData = [{ selectedIndex, inputScore }]

  props?.history?.push({
    pathName: '/admin/create-edit-category',
    state: {
      from: 'table',
      newData: { categoryData: categoryData[0] }
    }
  })

  const handleClickRowId = (columnIndex, rowIndex) => {
    console.log(columnIndex, rowIndex)
    const newData = rowsData[rowIndex]
    console.log(newData)
  }

  const converUserType = (value) => {
    console.log(value, "value")
    return value?.slice(5)?.replace('_', ' ')
  }

  // Update User Status
  const handleToggle = (row) => {
    props?.updateStatus(row)
  }

  const handleCheckboxChange = (e, index) => {
    console.log(e, index)
    setSelectedIndex([...selectedIndex, index])
  }

  //pageNumber
  const onChangingThePageIndex = (event, value) => {
    setPage(value)
    handlePagination(value)

    console.log(value, 'value')
  }

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // To do: need this for further
  const getScoresFunction = (value) => {
    console.log(value, "Value")
    const str = JSON.stringify(value).replace(/[{}]/g, "").split(',').join("\n")
    console.log(str)
    console.log(`<li>${str}</li>`)
    const strLi = `<li>${str}</li>`
    return strLi


  }


  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
      <Box className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell className={classes.tableCell} key={index}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsData?.length === 0 ? <p className={classes.recordsData} style={{ margin: 'auto' }}>  No records found for the selected date or status!! </p> :
                // .sort((a, b) =>
                // new Date(a?.createDate) > new Date(b?.createDate) ? 1 : -1
                // )
                rowsData?.map((row, index) => {
                  const isItemSelected = isSelected(row?.questionId);
                  return (
                    <TableRow
                      hover
                      className={classes.v1}
                      tabIndex={-1}
                      key={index}

                    >
                      {columns.map((column, columnIndex) => {
                        const value = row[column.id]

                        return (
                          <TableCell
                            key={index}
                            className={classes.tableCell}
                          >
                            {column.id === 'select' &&
                              (from === 'pccScheduled' ||
                                'callQueue' ||
                                'providerCallQueue' ||
                                'editCategory') ? (
                              <Checkbox
                                id={index}
                                checked={isItemSelected}
                                onChange={(e) => handleChange(e, index, row)}
                                color="primary"
                                style={{ position: 'relative', bottom: '5px' }}
                              />
                            )
                              // : from === 'payment' && column.id === 'name' ? (
                              //   <Link
                              //     style={{
                              //       color: '#2F8FF6',
                              //       textDecoration: 'none'
                              //     }}
                              //     to={{
                              //       pathname: '/admin/create-edit-paymentplan',
                              //       query: { row }
                              //     }}
                              //   >
                              //     {value}
                              //   </Link>
                              // ) 
                              : 
                              // from === 'contentManagement' && column.id === 'contentURL' ? (
                              //   <Link
                              //     style={{
                              //       color: '#2F8FF6',
                              //       textDecoration: 'none'
                              //     }}
                              //     to="/admin/create-content"
                              //   >{value}</Link>
                              // ) 
                              // 
                              from === 'editCategory' &&
                                column.id === 'options' ? (
                                //  console.log(value)

                                value?.map((each, index) => (
                                  <li
                                    className={classes.options}
                                    style={{ listStyleType: 'none' }}
                                    key={each}
                                  >
                                    {each || 'N/A'}
                                  </li>
                                ))
                              ) : column.id === 'score' &&
                                from === 'editCategory' ? (
                                value.map((each, scoreIndex) => (
                                  <input
                                    key={index}
                                    type="number"
                                    min="0"
                                    disabled={isItemSelected ? false : true}
                                    step="1"
                                    className={classes.inputTypeScore}
                                    onChange={(e) =>
                                      handleInputEnterScore(
                                        e,
                                        index,
                                        each,
                                        scoreIndex
                                      )
                                    }
                                  />
                                ))
                              ) : column?.id === 'save' ? (
                                <button
                                  type="button"
                                  style={{
                                    marginLeft: '20px',
                                    marginTop: '10px'
                                  }}
                                  disabled={isItemSelected ? false : true}
                                  onClick={(e) =>
                                    onClickSaveBtn(e, index, row?.questionId)
                                  }
                                >
                                  {/* {isItemSelected && toggle ? "Saved" : "Save"} */}
                                  Save
                                </button>
                              ) :
                                (from === 'questionsMappingBank' &&
                                  column.id === 'answers') ? (
                                  value?.map((each, index) => (
                                    <li
                                      className={classes.answerOptions}
                                      style={{ listStyleType: 'none' }}
                                      key={each}
                                    >
                                      {each || 'N/A'}
                                    </li>
                                  ))
                                )
                                  :
                                  from === 'questionsMappingBank' &&
                                    column.id === 'score' ? (
                                    // getScoresFunction(value)
                                    Object.entries(value).map((key, index) => {
                                      console.log(key, "key")
                                      return <li key={index} className={classes.answerOptions} style={{ listStyleType: 'none' }}>{`${key[0]}: ${key[1]}`}</li>
                                    }

                                    )

                                  ): 
                                  (column?.id === 'title')  && from === 'contentManagement' ?
                                  (
                                    <Link
                                      style={{
                                        color: '#2F8FF6',
                                        textDecoration: 'none'
                                      }}
                                      to={{
                                        pathname: `/admin/create-content/${row?.id}`,
                                        query: { row }
                                      }}
                                    >
                                      {value}
                                    </Link>
                                  )
                                    :
                                    column?.id === 'name' &&
                                      from === 'payment' ? (
                                      <Link
                                        style={{
                                          color: '#2F8FF6',
                                          textDecoration: 'none'
                                        }}
                                        to={{
                                          pathname: '/admin/create-edit-paymentplan',
                                          query: { row }
                                        }}
                                      >
                                        {value}
                                      </Link>
                                    ) : (column?.id === 'name' ||
                                      column?.id === 'relatedTo' ||
                                      column?.id === 'opportunityName') &&
                                      (from === 'callQueue' || from === 'myTasks') ? (
                                      <Link
                                        style={{
                                          color: '#2F8FF6',
                                          textDecoration: 'none'
                                        }}
                                        to={{
                                          pathname:
                                            `/pcc-dashboard/call-queue/patient-account/${row?.opportunity_id || row?.od_id}/${row.user_id}`,
                                          query: { userId: row.user_id, id: row.id }
                                        }}
                                      // to={{
                                      //   pathname:
                                      //     `/pcc-dashboard/call-queue/patient-account/${row.id}/${row.user_id}`,
                                      //   query: { userId: row.user_id, id: row.id }
                                      // }}
                                      >
                                        {' '}
                                        {value || 'N/A'}
                                      </Link>
                                    ) : (column?.id === 'providerName' ||
                                      column?.id === 'ID') &&
                                      from === 'providerCallQueue' ? (
                                      <Link
                                        style={{
                                          color: '#2F8FF6',
                                          textDecoration: 'none'
                                        }}
                                        to="/pcc-dashboard/separateCallQueueProvider/request"
                                      >
                                        {value}
                                      </Link>
                                    ) : column?.id === 'fullName' &&
                                      from === 'opsUserManagement' ? (
                                      <Link
                                        style={{
                                          color: '#2F8FF6',
                                          textDecoration: 'none'
                                        }}
                                        to={{
                                          pathname: `/admin/createModify/${row?.id}/opsUser`,
                                          query: { row }
                                        }}
                                      >
                                        {value}
                                      </Link>
                                    ) : (column?.id === 'question') && from === 'questionBank' ?
                                      (
                                        <Link
                                          style={{
                                            color: '#2F8FF6',
                                            textDecoration: 'none'
                                          }}
                                          to={{
                                            pathname: `/admin/create-edit-question/${row?.id}`,
                                            query: { row }
                                          }}
                                        >
                                          {value}
                                        </Link>
                                      ) :
                                      (column?.id === 'quizName') && from === 'quizManagement' ?
                                        (
                                          <Link
                                            style={{
                                              color: '#2F8FF6',
                                              textDecoration: 'none'
                                            }}
                                            to={{
                                              pathname: `create-quiz/${row?.id}`,
                                              query: { row }
                                            }}
                                          >
                                            {value}
                                          </Link>
                                        ) :
                                        column?.id === 'fullName' &&
                                          from === 'providerManagement' ? (
                                          <p
                                            style={{
                                              color: '#2F8FF6',
                                              textDecoration: 'none',
                                              cursor: 'pointer'
                                            }}
                                            onClick={(e) => sendToProviderDetails(row?.id)}
                                          // to={{
                                          //   pathname: `/admin/create-modify-provider/${row?.id}/provider`,
                                          //   query:{row}
                                          // }}
                                          >
                                            {value}
                                          </p>
                                        ) : column?.id === 'fullName' &&
                                          from === 'patientManagement' ? (
                                          <Link
                                            style={{
                                              color: '#2F8FF6',
                                              textDecoration: 'none'
                                            }}
                                            // to="/admin/create-modify-patient"
                                            to={{
                                              pathname: `/admin/create-modify-patient/${row?.id}/patient`,
                                              query: { row }
                                            }}
                                          >
                                            {value || 'N/A'}
                                          </Link>
                                        ) : (column?.id === 'name' ||
                                          column?.id === 'relatedTo') &&
                                          (from === 'callQueue' || from === 'myTasks') ? (
                                          <Link
                                            style={{
                                              color: '#2F8FF6',
                                              textDecoration: 'none'
                                            }}
                                            to="/pcc-dashboard/call-queue/patient-account"
                                          >
                                            {' '}
                                            {value || 'N/A'}
                                          </Link>
                                        ) : column?.id === 'opportunity_name' &&
                                          (from === 'myTasks' ||
                                            from === 'patientAccount') ? (
                                          <div
                                            onClick={() => {
                                              console.log(row, "row")
                                              setOpportunityDetailsToReducer(
                                                row?.opportunity_id || row?.od_id,
                                                row.user_id
                                              )
                                            }
                                            }
                                            style={{
                                              color: '#2F8FF6',
                                              cursor: 'pointer',
                                              textDecoration: 'none'
                                            }}
                                          >
                                            {value || row?.opportunity_id}
                                          </div>
                                        ) : (column?.id === 'providerName' ||
                                          column?.id === 'ID') &&
                                          from === 'providerCallQueue' ? (
                                          <Link
                                            style={{
                                              color: '#2F8FF6',
                                              textDecoration: 'none'
                                            }}
                                            to="/pcc-dashboard/separateCallQueueProvider/request"
                                          >
                                            {value}
                                          </Link>
                                        ) : column?.id === 'fullName' &&
                                          from === 'opsUserManagement' ? (
                                          <Link
                                            style={{
                                              color: '#2F8FF6',
                                              textDecoration: 'none'
                                            }}
                                            to={{
                                              pathname: `/admin/createModify/${row?.id}/opsUser`,
                                              query: { row }
                                            }}
                                          >
                                            {value}
                                          </Link>
                                        ) : column?.id === 'fullName' &&
                                          from === 'providerManagement' ? (
                                          <Link
                                            style={{
                                              color: '#2F8FF6',
                                              textDecoration: 'none'
                                            }}
                                            to={{
                                              pathname: '/admin/create-modify-provider',
                                              query: { row }
                                            }}
                                          >
                                            {value}
                                          </Link>
                                        ) : column?.id === 'fullName' &&
                                          from === 'patientManagement' ? (
                                          <Link
                                            style={{
                                              color: '#2F8FF6',
                                              textDecoration: 'none'
                                            }}
                                            to={{
                                              pathname: '/admin/create-modify-patient',
                                              query: { row }
                                            }}
                                          >
                                            {value || 'N/A'}
                                          </Link>
                                        ) : column?.id === 'createDate' ||
                                          column?.id === 'updateDate' ||
                                          column?.id === 'createdOn' ||
                                          column?.id === 'appointmentDate' ||
                                          column?.id === 'modify' ? (
                                          convertDate(value !== null ? value : row?.updateDate) || 'N/A'
                                        ) : column.id === 'rolesName' &&
                                          (from === 'user-management' || from === 'opsUserManagement' || from === "providerManagement" || from === "patientManagement") ? (
                                          converUserType(value)
                                        ) : column?.id === 'createDate' ||
                                          column?.id === 'updateDate' ||
                                          column?.id === 'createdOn' ? (
                                          convertDate(value) || 'N/A'
                                        ) : typeof value === 'object' &&
                                          value !== null &&
                                          (from === 'myTasks' ||
                                            from === 'providerCallQueue') ? (
                                          <Select
                                            style={{ maxWidth: '115px' }}
                                            select
                                            // ref={listenScrollRef}
                                            MenuProps={{ classes: { paper: classes.menuPaper } }}
                                            // value={props.selectedValue ?? " "}
                                            className="div-scroll-user"
                                            defaultValue={dropDownName}
                                            InputProps={{ disableUnderline: true }}
                                            id={value?.id}
                                            // onChange={(e) => handleDropDownChange(e?.target?.value)}
                                            onChange={(e) =>
                                              handleDropDownChange(e, value.opportunity_id)
                                            }
                                          >
                                            {value?.map((assign) => (
                                              <MenuItem
                                                key={assign?.code}
                                                value={assign?.id ? assign?.id : ''}
                                                // value={assign.name}
                                                name={assign?.id}
                                              >
                                                <span className="select-list-options">
                                                  <img
                                                    style={{
                                                      width: '20px',
                                                      height: '20px',
                                                      borderRadius: '40px',
                                                      marginRight: '10px'
                                                    }}
                                                    src={assign?.image}
                                                    className="img-responsive-image"
                                                  />
                                                  {assign?.name}
                                                </span>
                                              </MenuItem>
                                            ))}
                                          </Select>
                                        ) : (column.id === 'assigned_name' || column.id === 'assignedToCallFirstName') &&
                                          from === 'callQueue' ? (
                                          <div>

                                            <Select
                                              style={{ maxWidth: '115px', maxHeight: '333px' }}
                                              select
                                              MenuProps={{
                                                classes: { paper: classes.menuPaper }, PaperProps: {
                                                  onScroll: onScrollUserList
                                                }
                                              }}
                                              // value={props.selectedValue ?? " "}
                                              defaultValue={value}
                                              InputProps={{ disableUnderline: true }}
                                              id={value?.id}
                                              ref={listenScrollRef}
                                              className="div-scroll-user"
                                              // onScroll={onScrollUserList}
                                              // onChange={(e) => handleDropDownChange(e?.target?.value)}
                                              onChange={(e) =>
                                                handleDropDownChange(e, row?.opportunity_id || row?.id)
                                              }
                                            >

                                              {adminUser?.content?.map((assign) => (
                                                <MenuItem
                                                  key={assign?.code}
                                                  value={assign?.id}
                                                  name={assign?.firstName}
                                                >
                                                  <span className="select-list-options">
                                                    {assign?.image && (
                                                      <img
                                                        style={{
                                                          width: '20px',
                                                          height: '20px',
                                                          borderRadius: '40px',
                                                          marginRight: '10px'
                                                        }}
                                                        src={assign?.image}
                                                        className="img-responsive-image"
                                                      />
                                                    )}
                                                    {assign?.firstName}
                                                  </span>
                                                </MenuItem>
                                              ))}

                                            </Select>
                                            <span className="select-list-options">
                                              {row?.assignedToCallFirstName ||row?.assignedToFirstName }
                                            </span>
                                          </div>
                                        ) : typeof value === 'boolean' &&
                                          column.id === 'status' ? (
                                          //  console.log(value)
                                          <div style={{ marginLeft: '15px' }}>
                                            <AntSwitch
                                              checked={value}
                                              onChange={(e) => handleToggle(row)}
                                            />
                                          </div>
                                        ) : (value === ('Open' || null) ||
                                          value === ('Close' || null)) &&
                                          from === 'supportTicket' ? (
                                          <Grid
                                            style={{ marginLeft: '15px' }}
                                            container
                                            display="flex"
                                          >
                                            <Typography style={{ paddingRight: '20px' }}>
                                              {value || 'N/A'}
                                            </Typography>
                                            <AntSwitch
                                              defaultChecked={
                                                value === 'Open' ? true : false
                                              }
                                              // onClick = {() => setToggleValue(!toggleValue)}
                                              onClick={(e) =>
                                                onPccSupportToggleChange(e, index)
                                              }
                                            />
                                          </Grid>
                                        ) : value === 'Urgent' ? (
                                          <p className={classes.urgentTextColor}>
                                            {value || 'N/A'}
                                          </p>
                                        ) : value === 'Paid' ||
                                          (value === 'Open' && from === 'ticketSupport') ? (
                                          <p style={{ color: '#009A34' }}>
                                            {value || 'N/A'}
                                          </p>
                                        ) : column.id === 'status' &&
                                          from === 'callQueue' ? (
                                          <p className={classes.openTextColor}>
                                            {value === null ? 'N/A' : value || 'N/A'}
                                          </p>
                                        ) : value === 'Unpaid' ? (
                                          <p style={{ color: 'red' }}>{value || 'N/A'}</p>
                                        ) : value === ('Open' || 'Close' || null) &&
                                          (from === 'providerCallQueue' ||
                                            from === 'myTasks') ? (
                                          <p className={classes.openTextColor}>
                                            {value === null ? 'N/A' : value || 'N/A'}
                                          </p>
                                        ) : (
                                          value || 'N/A'
                                        )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {from === 'questionsMappingBank' ||
          from === 'appointmentReport' ||
          from === 'editCategory' ||
          from === 'providerCallQueue' ||
          from === 'supportTicket' ||
          from === 'providerManagement' ||
          from === 'patientManagement' ||
          from === 'opsUserManagement' ||
          from === 'user-management' ||
          from === 'quizManagement' ||
          from === 'callQueue' ||
          from === 'myTask' ||
          from === 'ticketSupport' ||
          from === 'userManagement' ||
          from === 'questionBank' ||
          from === 'contentManagement' ||
          from === 'payment' ? (
          <Grid container alignItems='center' style={{ height: '80px' }}>
            <Grid item xs={6} sm={6} xl={6} md={6} lg={6} >
              <Typography style={{ paddingLeft: '10px' }}>Total Records : {totalRecords}</Typography>
            </Grid>
            <Grid item xs={6} sm={6} xl={6} md={6} lg={6} >
              <Grid container justifyContent='flex-end' >
                <Grid>
                  <Select
                    onChange={handleChangeRowsPerPage}
                    defaultValue={rowsPerPage}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {[10, 25, 100].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))}
                  </Select>
                </Grid>
                <Grid>
                  <Pagination 
                    count={noOfPages}
                    color="primary"
                    onChange={onChangingThePageIndex}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          ''
        )}
      </Box>
    </Grid>
  )
}

export default Tables
