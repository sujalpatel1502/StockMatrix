import { View, TextInput, Text } from 'react-native'
import React, { useState } from 'react'
import Ionic from 'react-native-vector-icons/Ionicons'
const SearchBox = (props) => {
    const handleClick = (text) => {
        props.updateState(text)
    }
    return (
        <View style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            position: 'relative'
        }}>
            <Ionic name='search' style={{
                fontSize: 18,
                opacity: 0.7,
                position: 'absolute',
                left: 25,
                zIndex: 1
            }} />
            <TextInput placeholder='search'
                placeholderTextColor='#909090'
                onChangeText={(t) => handleClick(t)}
                style={{
                    width: '94%',
                    backgroundColor: '#EBEBEB',
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 15,
                    paddingLeft: 40
                }} />
            {/* <SearchContent updateState={search}/> */}
        </View>
    )
}
export default SearchBox