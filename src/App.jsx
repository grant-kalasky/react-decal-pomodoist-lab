import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      // TODO 1
      items : [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null,
      areItemsMarkedAsCompleted: false
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      // TODO 2: initialize new item object
      id: nextItemId,
      description: description,
      sessionsCompleted: 0,
      isCompleted: false
    };
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      items: prevState.items.concat(newItem),
      nextItemId: prevState.nextItemId + 1
    })));
  }

  clearCompletedItems() {
    // TODO 6
    var items = [...this.state.items];
    var uncompletedItems =  items.filter(item => item.isCompleted === false)
    this.setState({
      items: uncompletedItems,
      areItemsMarkedAsCompleted: false
    });
  }

  increaseSessionsCompleted(itemId) {
    // TODO 5
    var items = [...this.state.items];
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === itemId) {
        items[i].sessionsCompleted += 1;
      }
    }
    this.setState({
      items: items
    });
  }

  toggleItemIsCompleted(itemId) {
    // TODO 6
    var items = [...this.state.items];
    var areItemsCompleted = false;
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === itemId) {
        items[i].isCompleted = !items[i].isCompleted;
      }
    }
    for (let i = 0; i < items.length; i++) {
      if (items[i].isCompleted) {
        areItemsCompleted = true;
      }
    }
    this.setState({
      items: items,
      areItemsMarkedAsCompleted: areItemsCompleted
    });
  }

  startSession(id) {
    // TODO 4
    this.setState({
      sessionIsRunning: true,
      itemIdRunning: id
    });
  }

  render() {
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
      areItemsMarkedAsCompleted,
    } = this.state;
    var isEmpty = (items.length === 0);
    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            {areItemsMarkedAsCompleted &&
              <ClearButton onClick={this.clearCompletedItems} />
            }
          </header>
          {/* TODO 4 */}
            {sessionIsRunning && 
              <Timer
                key={itemIdRunning}
                mode="WORK"
                onSessionComplete={() => this.increaseSessionsCompleted(itemIdRunning)}
                autoPlays
              />
            }
            <div className="items-container">
              {/* TODO 3:  display todo items */}
              {isEmpty ? (
                <EmptyState />
              ) : (
                items.map((item) => (
                  <TodoItem 
                    key={item.id}
                    description={item.description} 
                    sessionsCompleted={item.sessionsCompleted}
                    isCompleted={item.isCompleted}
                    startSession={() => this.startSession(item.id)}
                    toggleIsCompleted={() => this.toggleItemIsCompleted(item.id)}
                    />
                  ))
                )
            }
            </div>
        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
