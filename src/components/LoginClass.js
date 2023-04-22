import { Component } from "react"

class LoginClass extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: 'Xin chao ban'

        }
    }

    render(){
        return (
            <div>
                <h1>{this.state.message}</h1>
                <button onclick={() => this.setState({message:'Ban da dang nhap thanh cong'})}>Dang nhap</button>
            </div>
        )
    }
}
export default LoginClass;