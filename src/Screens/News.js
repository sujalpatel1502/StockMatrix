import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from "react-native-axios"
const News = () => {
    // const axios = require('axios');
    const [data, setData] = useState({});
    const [requiredData, setRequiredData] = useState([]);
    useEffect(() => {
        // const required_data = [];
        fetchNews();
        // console.log(data["0"]["providerPublishTime"]);
        // console.log(data["0"]["publisher"]);
        // console.log(data["0"]["title"]);
    }, [])
    const show_news = () => {
        const size = Object.keys(data).length;
        console.log("======>", size);
        for (let index = 0; index < size; index++) {
            setRequiredData([...requiredData, {
                time: data[index.toString()]["providerPublishTime"],
                publisher: data[index.toString()]["publisher"],
                title: data[index.toString()]["title"]
            }])
            console.log("index: ", index);
        }
        console.log(requiredData);
    }
    const options = {
        method: 'GET',
        url: 'https://yahoo-finance127.p.rapidapi.com/news/TCS.NS',
        headers: {
            'X-RapidAPI-Key': '0fcd38364fmsheb382a0ce24439ep13af6ejsn8dbcf5c7b8fb',
            'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
        }
    };
    // useEffect(() => {
    //     fetchNews();
    // }, [])
    const fetchNews = async () => {
        try {
            const response = await axios.request(options).then((res) => {
                console.log(res.data);
                setData(res.data);
            }).then(() => {
                show_news();
            })
        } catch (error) {
            console.error(error);
        }
    }
    // show_news();
    const renderData = ({ item }) => {
        console.log(item);
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.publisher}>{item.publisher}</Text>
                <Text style={styles.time}>{item.time}</Text>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        )
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={requiredData}
                renderItem={renderData}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}
export default News
const styles = StyleSheet.create({})