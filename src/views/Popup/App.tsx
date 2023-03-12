import React from 'react';
import './App.css';
import { Flex, Button, Text, TextInput, Checkbox, Group, Box, Loader, Tabs, ColorSwatch } from '@mantine/core';
import { useForm } from '@mantine/form';
import {searchBloque, goToSchedule} from '../../content';
import { CursoItem } from '../types/types';
import { getCourses } from '../Utils/utils';

function App() {
  const [course, setCourse] = React.useState(true);
  const [nombreCourse, setNombreCourse] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string | null>('add');
  const [cursosAdded, setCursosAdded] = React.useState<CursoItem[]>([])

  React.useEffect(() => {
    getCourses({setCursos: setCursosAdded});
  },[cursosAdded]);  

  const form = useForm({
    initialValues: {
      bloque: '',
    },
    validate: {
      bloque: (value) => (value.length < 10 ? 'Bloque ingresado inválido' : null),
    },
  });

  const searchBloqueHandler = () => {
    setLoading(true);
    if (form.isValid()) {
      let response : boolean = searchBloque(form.values["bloque"], setCourse, setNombreCourse, setLoading);
      if (course) {
        form.setFieldError('bloque', 'Vuelva a digitar un bloque válido');
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {loading ? 
        <Loader></Loader>
        :
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
        <Tabs value={activeTab} onTabChange={setActiveTab} color="lime" variant="pills" defaultValue="gallery">
          <Tabs.List grow>
            <Tabs.Tab sx={{color: 'white'}} value="add">Agregar</Tabs.Tab>
            <Tabs.Tab sx={{color: 'white'}} value="watch">Ver cursos</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="add" pt="xs">
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
                    m='auto'
                    maw={200}
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
                    ml={10}
                    mr={10}
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
          </Tabs.Panel>

          <Tabs.Panel value="watch" pt="xs">
          <Box maw={300} mx="auto">
            {cursosAdded.length > 0 ?
              cursosAdded.map((item, index) => (
                <Flex
                  mih={50}
                  gap="xl"
                  justify="center"
                  align="center"
                  direction="row"
                  wrap="wrap"
                >
                <Group >
                  <ColorSwatch size={10} key={index} color={item.color ?? 'white'} />
                  <Flex
                    mih={50}
                    gap={0}
                    justify="center"
                    align="center"
                    direction="column"
                    wrap="wrap"
                  >
                  <Text fz={12}>{item.nombre}</Text>
                  <Text fz={12} fw={700}>({item.id})</Text>
                  </Flex>
                </Group>
                </Flex>
              ))
            :
              <Text
                c="blue"
                sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                ta="center"
                fz="md"
                fw={400}
              >
                No existen cursos agregados
              </Text>
            }
              <Group position="center" mt="md">
                <Button
                  onClick={() => goToSchedule()}
                >
                  Ver el horario
                </Button>
              </Group>
            </Box>
          </Tabs.Panel>

        </Tabs>
      </Flex>
        }
      </header>
    </div>
  );
}

export default App;
