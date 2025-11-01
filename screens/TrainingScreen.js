import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Platform } from 'react-native';
import { Directory, File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';


export default function TrainingScreen() {
  const downloadFromUrl = async () => {
    const url = 'https://disk.yandex.ru/i/unA09YWx8H9KXA';
    const destination = new Directory(Paths.cache, 'xmls');
    try {
      destination.create();
      const output = await File.downloadFileAsync(url, destination);
      const filename = "trainingPow.xml"
      console.log(output.exists); // true
      console.log(output.uri); // path to the downloaded file, e.g., '${cacheDirectory}/pdfs/sample.pdf'

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(output.uri, {
          mimeType: 'application/xml',
          dialogTitle: 'Открыть XML файл'
        });
      }

    } catch (error) {
      console.error(error);
    }
  };

  const downloadFromAPI = async () => {

  };

  const save = async (uri, filename, mimetype) => {

  };

  return (
    <View style={styles.container}>
      <Button title="Download From URL" onPress={downloadFromUrl} />
      <Button title="Download From API" onPress={downloadFromAPI} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});