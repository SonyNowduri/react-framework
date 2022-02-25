import {
  Chip,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  useTheme
} from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
]
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}

const MultiSelectDropDown = (props) => {
  const { label } = props
  const classes = useStyles()
  const theme = useTheme()
  const [personName, setPersonName] = React.useState([])
  const handleChange = (event) => {
    setPersonName(event.target.value)
  }
  return (
    <FormControl className={classes.formControl} fullWidth>
      <InputLabel id="demo-mutiple-chip-label">{label}</InputLabel>
      <Select
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        value={personName}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, personName, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default MultiSelectDropDown
