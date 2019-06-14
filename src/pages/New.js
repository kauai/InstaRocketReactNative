import React, { Component } from 'react'
import { Text, View,StyleSheet,TouchableOpacity,TextInput,Image } from 'react-native'
import fileType from 'react-native-file-type'
import imagePicker from 'react-native-image-picker'
import api from '../services/api'

export default class New extends Component {
    
    static navigationOptions = {
        headerTitle:'Nova publicaçao'
    }

    state = {
        preview:null,
        image:null,
        author:'',
        place:'',
        description:'',
        hashtags:''
    }

    handleSubmit = () => {
        console.log('entrou',this.state.image)
        const data = new FormData()
        data.append('image',this.state.image)
        data.append('author',this.state.author)
        data.append('place',this.state.place)
        data.append('description',this.state.description)
        data.append('hashtags',this.state.hashtags)
           console.log(data)
          //  const config = {
          //     headers: {
          //             'Content-Type': 'multipart/form-data; charset=utf-8; boundary="another cool boundary";'
          //     }
          //   }
          // api.get('posts',data)
          api.post('posts',data)
          .then(item => {
            console.log('result',item)
            this.props.navigation.navigate('Feed')
          }).catch(error => {
              console.log(error)
          })
        
    }

    handleSelectImage = () => {
        console.log('teste')
      imagePicker.showImagePicker({
        title:'Selecionar Imagem'
      },
      async upload => {
         if(upload.error){
             console.log('error')
         }else if(upload.didCancel){
             console.log('User cancelou')
         }else{
             const preview = {
                 uri:`data:image/jpeg;base64,${upload.data}`
             }
             let prefix;
             let ext;

             if(upload.fileName){
                [ prefix, ext ] = upload.fileName.split('.')
                ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext
             }else{
                 prefix = new Date().getTime()
                 ext = 'jpg'
             }
             
             const type = (await fileType(upload.path)).mime

             const image = {
              uri:upload.uri,
              type,
              name:upload.fileName
             }

             console.log('UPLOAD',upload)

            //  const image = {
            //      uri:upload.uri,
            //      type:upload.type,
            //      name:`${prefix}.${ext}`
            //  }

             this.setState({ preview ,image })
         }
     })
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.selectButton} onPress={this.handleSelectImage}>
                    <Text style={styles.selctButtonText}>Selecionar Imagens</Text>
                </TouchableOpacity>

                {this.state.preview && <Image style={styles.preview} source={this.state.preview}/>}

                <TextInput 
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Nome do author"
                    placeholderTextColor="#999"
                    value={this.state.author}
                    onChangeText={(author) => this.setState({ author })}
                />
                <TextInput 
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Local da foto"
                    placeholderTextColor="#999"
                    value={this.state.place}
                    onChangeText={(place) => this.setState({ place })}
                />
                <TextInput 
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Descriçao"
                    placeholderTextColor="#999"
                    value={this.state.description}
                    onChangeText={(description) => this.setState({ description })}
                />
                <TextInput 
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Hashtags"
                    placeholderTextColor="#999"
                    value={this.state.hashtags}
                    onChangeText={(hashtags) => this.setState({ hashtags })}
                />
                 <TouchableOpacity style={styles.shareButton} onPress={this.handleSubmit}>
                    <Text style={styles.shareButtonText}>Compartilhar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 30,
    },
  
    selectButton: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#CCC',
      borderStyle: 'dashed',
      height: 42,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    selectButtonText: {
      fontSize: 16,
      color: '#666',
    },
  
    preview: {
      width: 100,
      height: 100,
      marginTop: 10,
      alignSelf: 'center',
      borderRadius: 4,
    },
  
    input: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 15,
      marginTop: 10,
      fontSize: 16,
    },
  
    shareButton: {
      backgroundColor: '#7159c1',
      borderRadius: 4,
      height: 42,
      marginTop: 15,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    shareButtonText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#FFF',
    },
  });
  
