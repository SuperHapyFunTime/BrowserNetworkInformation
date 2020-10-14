import React from 'react';
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

class ConnectionInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connectionType: 'not set',
      connectionEffectiveType: 'not set',
      connectionDownlink: 'not set',
      connectionDownlinkMax: 'not set'
    };
  }

  connectionTypeChangeHandler = e => this.setNavigatorPropsToState();

  componentWillMount() {
    if (connection) this.setNavigatorPropsToState();
  }

  setNavigatorPropsToState() {
    this.setState({
      connectionType: connection.type,
      connectionEffectiveType: connection.effectiveType,
      connectionDownlink: connection.downlink,
      connectionDownlinkMax: connection.downlinkMax
    });
  }

  renderNetworkStats() {
    const { connectionType, connectionEffectiveType, connectionDownlink, connectionDownlinkMax } = this.state;

    return (
      <div>
        <h1>type = {connectionType}</h1>
        <p>
          Returns the type of connection a device is using to communicate with the network. It will be one of the following
          values:
        </p>
        <ul>
          <li>bluetooth</li>
          <li>cellular</li>
          <li>ethernet</li>
          <li>none</li>
          <li>wifi</li>
          <li>wimax</li>
          <li>other</li>
          <li>unknown</li>
        </ul>
        <br />

        <h1>effectiveType = {connectionEffectiveType}</h1>
        <p>
          Returns the effective type of the connection meaning one of 'slow-2g', '2g', '3g', or '4g'. This value is determined
          using a combination of recently observed round-trip time and downlink values.
        </p>
        <br />

        <h1>downlink = {connectionDownlink}</h1>
        <p>
          Returns the effective bandwidth estimate in megabits per second, rounded to the nearest multiple of 25 kilobits per
          seconds.
        </p>
        <br />

        <h1>downlinkMax = {connectionDownlinkMax}</h1>
        <p>Returns the maximum downlink speed, in megabits per second (Mbps), for the underlying connection technology.</p>
      </div>
    );
  }

  render() {
    if (connection) {
      navigator.connection.addEventListener('change', this.connectionTypeChangeHandler);
      return this.renderNetworkStats();
    }

    return (
      <div>
        <h1>The Network Information API doesnt work on this device or browser :/ </h1>
      </div>
    );
  }
}

export default ConnectionInfo;
