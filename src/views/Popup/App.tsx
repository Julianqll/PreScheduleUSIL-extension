import React from 'react';
import './App.css';
import { Flex, Button, Text, TextInput, Checkbox, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import {searchBloque, goToSchedule} from '../../content';

function App() {
  const [course, setCourse] = React.useState(true);
  const [nombreCourse, setNombreCourse] = React.useState('');

  const form = useForm({
    initialValues: {
      bloque: '',
    },
  });

  const searchBloqueHandler = () => {
    let response : boolean = searchBloque(form.values["bloque"], setCourse, setNombreCourse);
    if (course) {
      form.setFieldError('bloque', 'No se pudo encontrar el bloque');
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Flex
          mt={50}
          mb={50}
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
        >
          <Text
            c="blue"
            sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
            ta="center"
            fz="xl"
            fw={700}
          >
            USIL Pre-horario
          </Text>
          {course ? 
            <Box maw={300} mx="auto">
              <Text
                c="red"
                sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                ta="center"
                fz="sm"
                fw={700}
              >
              {nombreCourse}
              </Text>
              <form onSubmit={form.onSubmit(( _event) => {searchBloqueHandler()})}>
                <TextInput
                  sx={{ color: 'white' }}
                  withAsterisk
                  label="Copia el bloque del curso"
                  placeholder="CODIGODELBLOQUE"
                  {...form.getInputProps('bloque')}
                />
                <Group position="center" mt="md">
                  <Button type="submit">Buscar</Button>
                </Group>
              </form>
            </Box>
          :
            <Box maw={300} mx="auto">
              <form>
                <Text
                  c="blue"
                  sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                  ta="center"
                  fz="md"
                  fw={400}
                >
                  Curso encontrado y agregado: {nombreCourse}
                </Text>
                <Group position="center" mt="md">
                  <Button
                    onClick={() => goToSchedule()}
                  >
                    Ver el horario
                  </Button>
                </Group>
              </form>
            </Box>
          }
        </Flex>
      </header>
    </div>
  );
}

export default App;
