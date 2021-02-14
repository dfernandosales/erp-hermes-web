import React from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

const FilterActions = ({
  labels,
  fetching,
  onClear,
  toggleDetailedFilter,
  showDetailedFilter
}) => (
  <Grid container justify='flex-start' alignItems='center' style={{ paddingLeft: 8 }}>
    {toggleDetailedFilter && (
      <Grid item xs>
        <Typography
          type='caption'
          onClick={toggleDetailedFilter}
          style={{ cursor: 'pointer' }}
          color='primary'
        >
          {showDetailedFilter ? labels.simpleFilter : labels.detailedFilter}
        </Typography>
      </Grid>
    )}

    <Grid item xs>
      <Grid container justify='flex-end' alignItems='center' spacing={1}>
        
        {labels.clear && 
          <Grid item>
            <Button style={{ width: 120 }} type='button' onClick={onClear}>
              {labels.clear}
            </Button>
          </Grid>
        }

        <Grid item>
          <Button style={{ width: 120 }} type='submit' disabled={fetching} color='primary'>
            {fetching && <CircularProgress color='inherit' size={20} />}
            {labels.find}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)

FilterActions.propTypes = {
  labels: PropTypes.object,
  fetcing: PropTypes.bool,
  onClear: PropTypes.func,
  toggleDetailedFilter: PropTypes.func,
  showDetailedFilter: PropTypes.bool
}

FilterActions.defaultProps = {
  labels: PropTypes.object
}

export default FilterActions
