import React, {Component} from 'react'

class Input extends Component {
    render () {
        return (
            <div className={'form-group' + this.props.className}>
                <label className="control-label">{this.props.label}</label>
                <input autoFocus={this.props.autoFocus} type={this.props.type} placeholder={this.props.placeholder} className='form-control' ref={this.props.ref} value={this.props.value}
                    onChange={this.props.onChange} maxLength={this.props.maxLength} max={this.props.max} min={this.props.min} name={this.props.name} />
            </div>
        )
    }
}

/*Input.propTypes = {
    label: React.PropTypes.string,
    palceholder: React.PropTypes.string,
    onChange: React.PropTypes.func,
    value: React.PropTypes.any,
    autofocus: React.PropTypes.bool,
    maxLength: React.PropTypes.number,
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    name: React.PropTypes.string
}
*/
export default Input