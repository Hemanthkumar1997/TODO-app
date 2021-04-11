import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Task from './Components/Task';
import Colors from './assets/colors'

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const addTask = () => {
    Keyboard.dismiss();
    if(task !== null && task !== undefined && task !== '') {
      setTaskItems([...taskItems, task]);
      setTask(null);
    }
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>
          Today's tasks
        </Text>
        <View style={styles.items}>
          {
            taskItems.map(
              (item, index) => {return (
                <TouchableOpacity key={index} onPress={()=>completeTask(index)}>
                  <Task text={item}/>
                </TouchableOpacity>
              )
               }
            )
          }
        </View>
      </View>

      <KeyboardAvoidingView
        behaviour={Platform.OS === "android"? "padding": "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
            style={styles.input}
            placeholder={'Add new task'}
            onChangeText={text=>setTask(text)}
        />

        <TouchableOpacity onPress={() => addTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}> + </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.border,
    backgroundColor: "#FFF"
  },
  addText: {
    fontSize: 25,
    fontWeight: 'bold'
  },

});
