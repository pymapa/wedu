import React, {Component } from 'react'

class Textarea extends Component {

    render () {
        return (
            <div className={'form-group' + this.props.className}>
                <label className="control-label">{this.props.label}</label>
                <textarea 
                    className='form-control'
                    rows={this.props.rows}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    />
            </div>
        )
    }
}

export default Textarea