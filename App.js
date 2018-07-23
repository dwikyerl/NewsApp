import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';

import { getNews } from './src/news';

import Article from './src/components/Article';


export default class App extends Component {
  state = {
    articles: [],
    refreshing: true
  }

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    try {
      const articles = await getNews();
      console.log(articles);
      this.setState({ articles, refreshing: false });
    } catch (e) {
      this.setState({ refreshing: false });      
    }
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => this.fetchNews())
  }

  render() {
    return (
      <FlatList 
        data={this.state.articles}
        renderItem={({ item }) => (
          <Article article={item} id={item.url}/>
        )}
        keyExtractor={item => item.url}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
