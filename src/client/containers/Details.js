import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Details from '../components/Details';
import * as entityActions from '../actions/model';

function mapStateToProps(state) {
    return {
        applicationDomain: state.applicationDomain,
        model: state.model
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(entityActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);