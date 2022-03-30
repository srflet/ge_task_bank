import React, { Component } from 'react'
import { CustomButton } from '../components/Button';
import { Input } from '../components/Forms';
import IntroLayout from './IntroLayout'

export default class Username extends Component {
    state = {
        username: "",
        MID: ""
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const MID = params.get("MID");
        
        this.setState({["MID"]: MID})

    }

    handleChange = e => {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value })
    }

    handleSubmit = e => {
        e.preventDefault()

        const { player, onNext } = this.props
        const { username, MID } = this.state

        player.set("username", username)
        player.set("MID", MID)
        onNext()
    }

    render() {
        const {
            hasPrev,
            onPrev,
            onNext,
            hasNext,
        } = this.props

        const { username, MID } = this.state

        return (
            <IntroLayout title="Username" {...this.props}>
                <div>
                    <p>Your Worker ID: <strong>{MID}</strong></p>
                    <p>Please enter a username to be displayed in the chatroom with other participants:</p>
                    <form onSubmit={this.handleSubmit}>
                        <Input
                            name="username"
                            onChange={this.handleChange}
                            placeholder="enter username..."
                            value={username}
                            autoComplete="off"
                            required
                            style={{ width: "80%" }}
                        />

                        <br />

                        <div className="flex justify-center flex-wrap-reverse">
                            <CustomButton
                                onClick={onPrev}
                                disabled={!hasPrev}
                                color="secondary"
                                outline
                                style={{ margin: "10px" }}
                            >
                                Previous
                            </CustomButton>

                            <CustomButton
                                type="submit"
                                style={{ margin: "10px" }}
                            >
                                Submit Username
                        </CustomButton>
                        </div>

                    </form>
                </div>
            </IntroLayout >
        )
    }
}
