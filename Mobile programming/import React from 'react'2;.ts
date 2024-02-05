import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemId: {
        fontSize: 16,
        marginRight: 10,
    },
    itemDetailsContainer: {
        flex: 1,
        marginRight: 10,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 14,
        marginTop: 5,
    },
    itemButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    itemButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    headerCont: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    headerTxt: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default class App extends React.Component {
    state = {
        items: [],
        isLoading: false
    }

    renderRow = ({ item }) => {
        const isExpanded = item.id === this.state.expandedItemId;
        return (
            <View style= { styles.itemContainer } >
            <Text style={ styles.itemId }> { item.id } < /Text>
                < View style = { styles.itemDetailsContainer } >
                    <Text style={ styles.itemTitle }> { item.title } < /Text>
        {
            isExpanded && <Text style={ styles.itemDescription }> { item.description } < /Text>}
                < /View>
                < TouchableOpacity
            style = { styles.itemButton }
            onPress = {() => this.handlePress(item.id)
        }
        >
            <Text style={ styles.itemButtonText }> { isExpanded? 'Hide': 'Click' } < /Text>
                < /TouchableOpacity>
                < /View>
    )
    }

    handlePress = (itemId) => {
        this.setState(prevState => ({
            expandedItemId: prevState.expandedItemId === itemId ? null : itemId,
        }));
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        // Replace this with your own data
        const myData = [
            { id: 1, title: 'Object Oriented Programming', description: 'This course is designed to instill students with an understanding of the Object Oriented approach to programming.' },
            { id: 2, title: 'Study and Research Methods', description: 'In sum, the Course of Study and Research Methods introduces the student to academic studies' },
            { id: 3, title: 'General English', description: 'This course explores rules and principles governing the use of the English language in its different forms (spoken and written). ' },
            // Add more items as needed
        ];

        this.setState({ isLoading: true });
        this.setState({ items: myData });
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <View style= {{ flex: 1, marginTop: 50 }
    }>
        <View style={ styles.headerCont }>
            <Text style={ styles.headerTxt }> Courses < /Text>
                < /View>
                < FlatList
data = { this.state.items }
renderItem = { this.renderRow }
refreshing = { this.state.isLoading }
onRefresh = { this.getData }
keyExtractor = {(item) => item.id.toString()}
/>
    < /View>
    )
  }
}
