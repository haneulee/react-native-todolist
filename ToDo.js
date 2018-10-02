import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      toDoValue: props.text
    };
  }
  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    completeToDo: PropTypes.func.isRequired,
    unCompleteToDo: PropTypes.func.isRequired,
    updateText: PropTypes.func.isRequired
  };
  render() {
    const { isEditing, toDoValue } = this.state;
    const { text, id, deleteToDo, isCompleted, updateText } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completed : styles.unCompleted
              ]}
            />
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              style={[
                styles.text,
                styles.input,
                isCompleted ? styles.completedText : styles.unCompletedText
              ]}
              value={toDoValue}
              multiline={true}
              onChangeText={this._controllInput}
              returnKeyType={"done"}
              onBlur={this._finishEditing}
            />
          ) : (
            <Text
              style={[
                styles.text,
                isCompleted ? styles.completedText : styles.unCompletedText
              ]}
            >
              {text}
            </Text>
          )}
        </View>
        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._finishEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✅</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._startEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✏️</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPressOut={(event) => {event.stopPropagation(); deleteToDo(id);}}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>❌</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
  _toggleComplete = (event) => {
    event.stopPropagation();
    const {isCompleted, id, completeToDo, unCompleteToDo} = this.props;

    if (isCompleted) {
      unCompleteToDo(id);
    } else {
      completeToDo(id);
    }
  };
  _startEditing = (event) => {
    event.stopPropagation();
    const { text } = this.props;
    this.setState({
      isEditing: true,
      toDoValue: text
    });
  };
  _finishEditing = (event) => {
    event.stopPropagation();
    const {toDoValue} = this.state;
    const {id, updateText} = this.props;
    updateText(id, toDoValue);
    this.setState({
      isEditing: false
    });
  };
  _controllInput = text => {
    this.setState({
      toDoValue: text
    });
  };
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#bbb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "red",
    borderWidth: 3,
    marginRight: 20
  },
  text: {
    fontSize: 20,
    marginVertical: 20,
    fontWeight: "600"
  },
  completed: {
    borderColor: "#bbb"
  },
  unCompleted: { borderColor: "#F23657" },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through"
  },
  unCompletedText: {
    color: "#353839"
  },
  column: {
    flexDirection: "row",
    width: width / 2,
    alignItems: "center"
  },
  actions: {
    flexDirection: "row"
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  input: {
    marginVertical: 15,
    width: width / 2,
    paddingBottom: 5
  }
});
