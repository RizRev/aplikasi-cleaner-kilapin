import React, { useEffect, useState } from 'react'
import { TouchableOpacity,KeyboardAvoidingView,ScrollView,View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LottieView from 'lottie-react-native'
import { ButtonGroup } from 'react-native-elements';
import Gap from '../../components/Gap'
import { Pressable } from 'react-native';


const validationSchema = Yup.object().shape({
  nik: Yup.string()
    .required('NIK diperlukan')
    .length(16, 'NIK harus berjumlah 16 angka'),
  nama: Yup.string()
    .required('Nama diperlukan')
    .min(5, 'Nama harus minimal 5 huruf'),
  tempat_tgl: Yup.string()
    .required('Tempat, tanggal lahir diperlukan')
    .min(5, 'Tempat, tanggal lahir harus minimal 5 huruf'),
  alamat: Yup.string()
    .required('Alamat diperlukan')
    .min(5, 'Alamat harus minimal 5 huruf'),
  email: Yup.string()
    .required('Email diperlukan')
    .email('Format email tidak valid'),
  nomor_telp: Yup.string()
    .required('Nomor telepon diperlukan')
    .min(12, 'Nomor telepon harus 12-13 angka')
    .max(13, 'Nomor telepon harus 12-13 angka'),
});

const FormExample = ({navigation}) => {
  const handleSignUp = async (values) => {
    console.log(values);
    console.log(selectedOption)
    console.log(selectedIndex)
    try {
      console.log("menajalankan signup")
      const link = `http://153.92.4.143:4567/users/signup`
      const response = await fetch(link, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log('Response data:', data);

        if (data.data) {
        console.log('Response data:',data.data.nik);
        navigation.navigate('Camera',{nik: data.data.nik})
      } 
    } catch (error) {
      console.error("ini error",error);
    }
  };

const buttons = ['Iya', 'Tidak'];
const [selectedIndex, setSelectedIndex] = useState(null);

const handleButtonPress = (index) => {
  setSelectedIndex(index)
    console.log(index);
};

const [selectedOption, setSelectedOption] = useState(null);

  const Option = ({ title, value }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}
        onPress={() => setSelectedOption(value)}
      >
        <View
          style={{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {selectedOption === value ? (
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#000',
              }}
            />
          ) : null}
        </View>
        <Text style={{ marginLeft: 10 }}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Formik
      initialValues={{
        nik: '',
        nama: '',
        tempat_tgl: '',
        alamat: '',
        email: '',
        nomor_telp: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSignUp(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
          <LottieView 
          source={require('../../assets/animation/kilapin.json')}
          autoPlay
          loop
        style={{width: 100, height: 100,alignSelf: 'center'}}
          // style={styles.namelogo}
          />
            <Text
            style={{alignSelf:'center'}}
            >Apakah anda memiliki kendaraan?</Text>
          <ButtonGroup
          buttons={buttons}
          selectedIndex={selectedIndex}
          onPress={handleButtonPress}
          containerStyle={{
            borderRadius:30,
            width:300
          }}
          selectedButtonStyle={{
            backgroundColor:'#DA7DE1'
          }}
          />
          <Gap height={15}/>
          <TextInput
            name="nik"
            placeholder="NIK"
            style={styles.input}
            onChangeText={handleChange('nik')}
            onBlur={handleBlur('nik')}
            value={values.nik}
          />
          {errors.nik && touched.nik ? <Text style={styles.errorText}>{errors.nik}</Text>: <View style={{height:15}}></View>}

          <TextInput
            name="nama"
            placeholder="Nama"
            style={styles.input}
            onChangeText={handleChange('nama')}
            onBlur={handleBlur('nama')}
            value={values.nama}
          />
          {errors.nama && touched.nama ? <Text style={styles.errorText}>{errors.nama}</Text>: <View style={{height:15}}></View>}

          <TextInput
            name="tempat_tgl"
            placeholder="Tempat, Tanggal Lahir"
            style={styles.input}
            onChangeText={handleChange('tempat_tgl')}
            onBlur={handleBlur('tempat_tgl')}
            value={values.tempat_tgl}
          />
          {errors.tempat_tgl && touched.tempat_tgl ? <Text style={styles.errorText}>{errors.tempat_tgl}</Text>: <View style={{height:15}}></View>}

          <TextInput
            name="alamat"
            placeholder="Alamat"
            style={styles.input}
            onChangeText={handleChange('alamat')}
            onBlur={handleBlur('alamat')}
            value={values.alamat}
          />
          {errors.alamat && touched.alamat ? <Text style={styles.errorText}>{errors.alamat}</Text>: <View style={{height:15}}></View>}

          <TextInput
            name="email"
            placeholder="Email"
            style={styles.input}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {errors.email && touched.email ? <Text style={styles.errorText}>{errors.email}</Text>: <View style={{height:15}}></View>}

          <TextInput
            name="nomor_telp"
            placeholder="Nomor Telepon"
            style={styles.input}
            onChangeText={handleChange('nomor_telp')}
            onBlur={handleBlur('nomor_telp')}
            value={values.nomor_telp}
          />
          {errors.nomor_telp && touched.nomor_telp ? <Text style={styles.errorText}>{errors.nomor_telp}</Text>: <View style={{height:15}}></View>}
          <Option title="By accepting this Agreement, you agree to be bound by the terms and conditions." 
          value="Accept" />
          <Pressable style={styles.press} onPress={handleSubmit} disabled={selectedIndex===1||selectedIndex===null || selectedOption === null}>
          <Text style={styles.buttontext} onPress={handleSubmit} disabled={selectedIndex===1 || selectedIndex===null || selectedOption===null}>
          {(selectedIndex !== 1) ? ('SELANJUTNYA'):('MAAF, ANDA HARUS MEMILIKI KENDARAAN')}
          </Text>
          </Pressable>
          </ScrollView>
          {/* <Button  onPress={handleSubmit} title="Sign Up" /> */}
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor:'#fff'
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#8D8D8D',
    borderRadius:30,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  errorText: {
    marginTop:-10,
    color: 'red',
    height: 25
  },  
  namelogo: {
    flex: 1,
      width: 100,
      color:'#fff',
      fontFamily: 'Ubuntu-Bold',
      fontSize: 32,
      height: 100,
      marginTop: '-1%',
      marginBottom: '-25%',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
  },
  press: {
    alignSelf: 'center',
    backgroundColor: '#DA7DE1',
    height: 51,
    borderRadius:30,
    width: 300,
  },
  buttontext:{
    marginTop:13,
    color: '#fff',    
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Ubuntu-Bold',
    fontSize: 16,
  },
});

export default FormExample;