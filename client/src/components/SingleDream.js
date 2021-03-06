import React, { Component } from 'react'
import axios from "axios"
import { Redirect } from 'react-router-dom'


export default class SingleDream extends Component {
    state = {
        dream: {
            date: '',
            category: '',
            description: ''
        },
        redirect: false,
        updateFormInvisable: false
    }
    componentDidMount() {
        axios.get(`/api/dream/${this.props.match.params.dreamId}`)
            .then((res) => {
                this.setState({ dream: res.data })
            })
    }

    onChange = (evt) => {
        const value = evt.target.value
        const name = evt.target.name
        const copyOfState = { ...this.state }
        copyOfState.dream[name] = value
        this.setState(copyOfState)
    }

    onSubmit = (evt) => {
        evt.preventDefault()
        axios.put(`/api/dream/${this.props.match.params.dreamId}`, this.state.dream)
            .then(() => {
                this.setState({ redirect: true })
            })
    }

    toggleUpdateForm = () => {
        const toggle = !this.state.updateFormInvisable
        this.setState({ updateFormInvisable: toggle })
    }

    deleteDream = () => {
        axios.delete(`/api/dream/${this.props.match.params.dreamId}`)
            .then(() => {
                this.setState({ redirect: true })
            })
    }

    render() {
        return (
            <div className="dreamContainer">
                {this.state.redirect === true ? <Redirect to='/dream' /> : null}
                <h1>{this.state.dream.date} </h1>
                {this.state.updateFormInvisable === false ?
                    <div className="addEntryButtonDiv">
                        <button className="addEntryButton" onClick={this.toggleUpdateForm}>Edit Entry</button>
                        <button className="addEntryButton" onClick={this.deleteDream}>Delete Entry</button>
                    </div> :
                    <div className="addEntryButtonDiv">
                        <button className="addEntryButton" onClick={this.toggleUpdateForm}>Back</button>
                        <button className="addEntryButton" onClick={this.deleteDream}>Delete Entry</button>
                    </div>}
                {this.state.updateFormInvisable === false ?
                    (<div className="singleEntryDiv">
                        <div className="entryText">Category: {this.state.dream.category}</div>
                        <div className="entryText">{this.state.dream.description}</div>
                    </div>) : null}
                {this.state.updateFormInvisable === true ?
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <div className='inputBoxDiv'>
                                <input
                                    onChange={this.onChange}
                                    type="date"
                                    name="date"
                                    placeholder='date'
                                    value={this.state.dream.date} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input onChange={this.onChange}
                                    type="text"
                                    name="category"
                                    placeholder='category'
                                    value={this.state.dream.category} />
                            </div>
                            <div className='inputBoxDiv'>
                                <textarea rows="10" cols="75"
                                    onChange={this.onChange}
                                    type="text"
                                    name="description"
                                    placeholder='description'
                                    value={this.state.dream.description} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input type="submit"
                                    value="Update Dream" />
                            </div>
                        </form>
                    </div> : null}
            </div>
        )
    }
}
