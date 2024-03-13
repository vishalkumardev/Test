import { Alert, Button, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScratchCard } from 'rn-scratch-card'

const App = () => {


  const [toggle, settoggle] = useState(false);
  const [scratchCard, setscratchCard] = useState({
  })
  const [Data, setData] = useState([
    {
      "id": 23,
      "nine_numbers": [
        100,
        50,
        1,
        5,
        2,
        20,
        1,
        1,
        10
      ],
      "scratched": 591028,
      "win": true,
      "prize": 1
    },
    {
      "id": 22,
      "nine_numbers": [
        10,
        1,
        20,
        2,
        100,
        2,
        2,
        5,
        50
      ],
      "scratched": 591031,
      "win": true,
      "prize": 2
    },
    {
      "id": 32,
      "nine_numbers": [
        1,
        100,
        1,
        2,
        20,
        50,
        10,
        5,
        1
      ],
      "scratched": 591032,
      "win": true,
      "prize": 1
    },
    {
      "id": 9,
      "nine_numbers": [
        5,
        2,
        1,
        100,
        10,
        1,
        50,
        20,
        1
      ],
      "scratched": 591035,
      "win": true,
      "prize": 1
    },
    {
      "id": 21,
      "nine_numbers": [
        20,
        1,
        10,
        50,
        2,
        1,
        5,
        1,
        100
      ],
      "scratched": 591036,
      "win": true,
      "prize": 1
    },
    {
      "id": 55,
      "nine_numbers": [
        20,
        5,
        500,
        1000,
        1,
        200,
        5000,
        100,
        50
      ],
      "scratched": 779586,
      "win": false,
      "prize": 0
    },
    {
      "id": 59,
      "nine_numbers": [
        1000,
        100,
        50,
        20,
        200,
        5,
        2,
        1,
        10
      ],
      "scratched": 779588,
      "win": false,
      "prize": 0
    },
    {
      "id": 72,
      "nine_numbers": [
        100,
        20,
        200,
        50,
        1000,
        500,
        10,
        5000,
        2
      ],
      "scratched": 779590,
      "win": false,
      "prize": 0
    },
    {
      "id": 99,
      "nine_numbers": [
        100,
        1000,
        10,
        50,
        20,
        5,
        500,
        200,
        2
      ],
      "scratched": 779592,
      "win": false,
      "prize": 0
    },
    {
      "id": 84,
      "nine_numbers": [
        500,
        5,
        1,
        5000,
        100,
        50,
        1000,
        10,
        200
      ],
      "scratched": 779593,
      "win": false,
      "prize": 0
    }
  ]
  )
  const [alreadyCalled, setalreadyCalled] = useState(false)

  // use to fetch data
  const getData = async () => {
    const response = await fetch("https://lifetimelotto.games:5000/api/user/scratchcardWinLoss/31/32");
    const data = await response.json();
    setData(data.data)
  }


  useEffect(() => {
    getData();
  }, [])


  // use to update for win
  const win = async () => {
    const response = await fetch(`https://lifetimelotto.games:5000/api/scratchcardwin/:${scratchCard.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        "UserId": "31",
        "transactionId": "O49988180834638",
        "amount": "prize amount obtained from the Get API",
        "transactionType": "Card_Won",
        "scratchCardId": scratchCard.scratched,
        "description": "Win from Coin of gold of 1"
      }
    })
    const data = await response.json();
  }


  // use to update for lost

  const lost = async () => {
    const response = await fetch(`https://lifetimelotto.games:5000/api/scratchcardloss/:${scratchCard.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
    })
    const data = await response.json();
  }



  const handleScratch = async () => {
    if (!alreadyCalled) {
      setalreadyCalled((previousState) => {
        return !previousState
      })
      removeCard();
      if (scratchCard.win) {
        Alert.alert("You win");
        win();
      } else {
        Alert.alert("You Lose");
        lost();
      }
    }
  };

  // when user scratch any card it will remove 
  const removeCard = () => {
    let data = Data;
    let newArr = data.filter((value) => {
      return scratchCard.id !== value.id;
    })
    setData(newArr)
  }

  return (
    <View style={{ flex: 1 }}>
      {/* list of card */}
      <FlatList
        data={Data}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={{ width: "47%", marginHorizontal: "1.5%", marginVertical: 10 }} onPress={() => {
              settoggle(true);
              setscratchCard(item)
            }}>
              <Image source={{ uri: "https://t4.ftcdn.net/jpg/01/12/32/65/360_F_112326568_9KxPupyq3RqsGAobkXcwgeb6QMCWCkOB.jpg" }} style={{ height: 200, }} resizeMode='contain' />
            </TouchableOpacity>
          )
        }}

      />

      {/* modal for scratch card */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={toggle}
        onRequestClose={() => {
          settoggle(!toggle);
          setscratchCard({})
          setalreadyCalled(false)
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            {/* list of nine numbers  */}
            <View style={{ position: "absolute", alignSelf: "center", bottom: "15%" }}>
              <FlatList
                data={scratchCard.nine_numbers}
                numColumns={3}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity style={{ width: 70, marginHorizontal: "2%", height: 70, backgroundColor: "#808080", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 500, marginVertical: 10 }}>
                      <Text style={{ fontSize: 24, color: "white" }}>{item}</Text>
                    </TouchableOpacity>
                  )
                }}
              />
            </View>

            {/* scratch card component*/}

            <View style={{ alignSelf: "center" }}>
              <ScratchCard
                onScratch={handleScratch}
                source={{ uri: "https://media.emailonacid.com/wp-content/uploads/2020/01/ScratchOffInteractive-Blog.gif" }}
                brushWidth={200}
                resizeMode="cover"
                style={{
                  height: 300,
                  width: 300,
                  borderRadius: 100,
                }}
              />
            </View>

          </View>
        </View>
      </Modal>



    </View >
  )
}

export default App

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})