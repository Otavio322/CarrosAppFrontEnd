import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CarroCard from "../../src/components/CarroCard";
import CarroForm from "../../src/components/CarroForm";
import { carroService } from "../../service/api";

type Carro = {
  _id: string;
  nome: string;
  modelo: string;
  tipo: string;
  imageUrl: string;
};

export default function HomeScreen() {
  const [carros, setCarros] = useState<Carro[]>([]);
  const [carroEditando, setCarroEditando] = useState<Carro | null>(null);
  const [resetKey, setResetKey] = useState(0);

  const carregar = async () => {
    try {
      const { data } = await carroService.listar();
      setCarros(data);
    } catch {
      Alert.alert("Erro", "Não foi possível carregar os carros.");
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const handleSalvar = async (form: Omit<Carro, "_id">) => {
    if (!form.nome || !form.modelo) {
      Alert.alert("Atenção", "Preencha o nome e o modelo do carro.");
      return;
    }
    try {
      if (carroEditando) {
        await carroService.atualizar(carroEditando._id, form);
        setCarroEditando(null);
      } else {
        await carroService.criar(form);
      }
      await carregar();
      setResetKey((k) => k + 1);
    } catch {
      Alert.alert("Erro", "Não foi possível salvar o carro.");
    }
  };

  const handleEditar = (carro: Carro) => setCarroEditando(carro);

  const handleDeletar = (carro: Carro) => {
    Alert.alert("Excluir", `Deseja excluir "${carro.nome}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await carroService.deletar(carro._id);
            await carregar();
          } catch {
            Alert.alert("Erro", "Não foi possível excluir.");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🚗 Car Manager</Text>
        <Text style={styles.headerSub}>
          {carros.length} carro(s) cadastrado(s)
        </Text>
      </View>

      <FlatList
        data={carros}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.lista}
        ListHeaderComponent={
          <CarroForm
            key={carroEditando?._id ?? resetKey}
            onSalvar={handleSalvar}
            carroEditando={carroEditando}
            onCancelar={() => setCarroEditando(null)}
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🚘</Text>
            <Text style={styles.emptyText}>Nenhum carro cadastrado ainda.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <CarroCard
            carro={item}
            onEditar={handleEditar}
            onDeletar={handleDeletar}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F1117" },
  header: {
    backgroundColor: "#E63946",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "800" },
  headerSub: { color: "rgba(255,255,255,0.75)", fontSize: 13 },
  lista: { padding: 16 },
  empty: { alignItems: "center", marginTop: 30 },
  emptyIcon: { fontSize: 48, marginBottom: 10 },
  emptyText: { color: "#555", fontSize: 14 },
});