import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../../actions";
import Login from "./Login";

function mapStateToProps (state) {
    return {
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);