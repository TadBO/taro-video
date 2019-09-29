import Taro, { Component } from '@tarojs/taro'
import {  View, Button, Picker, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'


@connect(({ counter }) => ({
  counter
}))
class Control extends Component {
  state = {
    channelList: [],
    sourceList: [],
    channelIndex: 0,
    sourceIndex: 0,
    selectSource: '',
  }

  config = {
    navigationBarTitleText: '控制'
  }

  componentWillMount () { }

  componentDidMount () {
    Taro.request({url: 'https://tadbo.github.io/viplist/viplist.json'}).then((res) => {
      const { data: {platformlist, list}} = res;
      this.setState({
        channelList: platformlist,
        sourceList: list,
      });
    });
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  handleClick() {
    const { dispatch, counter: { currentUrl } } = this.props;
    const { selectSource } = this.state;
    const targetUrl = `${selectSource}${currentUrl}`;
    dispatch({
      type: 'setState',
      payload: {
        url: targetUrl,
      },
    });
    Taro.switchTab({
      url: '/pages/index/index',
    });
  }
  channelChange(e) {
    const { detail: { value }} = e;
    const { channelList } = this.state;
    const { dispatch } = this.props;
    this.setState({
      channelIndex: value,
    });
    try {
      dispatch({
        type: 'setState',
        payload:{url: channelList[value].url}
      });
    } finally {
      Taro.switchTab({
        url: '/pages/index/index',
      });
    }
  }
  handleSourceChange(e) {
    const { detail: { value }} = e;
    const { sourceList } = this.state;
    this.setState({
      sourceIndex: value,
      selectSource: sourceList[value].url,
    });
  }
  handleBcakClik() {
    const { dispatch, counter: { currentUrl } } = this.props;
    dispatch({
      type: 'setState',
      payload: {
        url: currentUrl,
      },
    });
    Taro.switchTab({
      url: '/pages/index/index',
    });
  }
  render () {
    const { channelList, channelIndex, sourceList,sourceIndex, selectSource  } = this.state;
    return (
     <View>
       <View>
         <Text>视频源</Text>
         <View>
           <Picker range={channelList} value={channelIndex} onChange={this.channelChange} mode='selector' rangeKey='name'>
             <View>
               <Text>当前选择：{channelList[channelIndex].name}</Text>
             </View>
           </Picker>
         </View>
       </View>
       <View>
         <Text>解析源</Text>
         <Picker range={sourceList} value={sourceIndex} rangeKey='name' onChange={this.handleSourceChange}>
           <View>
             <Text>当前选择：{sourceList[sourceIndex].name}</Text>
           </View>
         </Picker>
       </View>
       <View>
         <Button onClick={this.handleBcakClik}>返回原视频</Button>
       </View>
       <View><Button disabled={!selectSource} onClick={this.handleClick}>破解</Button></View>
     </View>
    )
  }
}

export default Control;
