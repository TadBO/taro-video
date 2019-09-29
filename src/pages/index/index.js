import Taro, { Component } from '@tarojs/taro'
import { WebView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.less'

@connect(({ counter }) => ({
  counter
}))
class Index extends Component {
  constructor(props) {
    super(...props);
  }
  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  handleLoad(e) {
    const { detail: { src }} = e;
    const { dispatch } = this.props;
    const targetUrl = /\?url=/.test(src) ? src.split('?url=')[1] : src;
    dispatch({ type: 'setState', payload: { currentUrl: targetUrl}});
  }
  render () {
    const { counter: {url} } = this.props;
    return (
      <WebView src={url} onLoad={(e) => {this.handleLoad(e)}} />
    )
  }
}

export default Index;
