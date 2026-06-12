import { useState } from "react";
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

export default function HomeScreen() {
  const [carros, setCarros] = useState([]);
  const [carroEditando, setCarroEditando] = useState(null);

  const handleSalvar = (form) => {
    if (!form.nome || !form.modelo) {
      Alert.alert("Atenção", "Preencha o nome e o modelo do carro.");
      return;
    }

    if (carroEditando) {
      setCarros((prev) =>
        prev.map((c) =>
          c.id === carroEditando.id ? { ...form, id: c.id } : c,
        ),
      );
      setCarroEditando(null);
    } else {
      setCarros((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }
  };

  const handleEditar = (carro) => setCarroEditando(carro);

  const handleDeletar = (carro) => {
    Alert.alert("Excluir", `Deseja excluir "${carro.nome}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () =>
          setCarros((prev) => prev.filter((c) => c.id !== carro.id)),
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
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        ListHeaderComponent={
          <CarroForm
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
