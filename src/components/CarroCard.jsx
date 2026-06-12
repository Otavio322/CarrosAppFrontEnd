import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TIPO_LABEL = {
  eletrico: { label: "⚡ Elétrico", cor: "#4CAF50" },
  gasolina: { label: "⛽ Gasolina", cor: "#FF9800" },
  diesel: { label: "🛢️ Diesel", cor: "#795548" },
};

export default function CarroCard({ carro, onEditar, onDeletar }) {
  const tipo = TIPO_LABEL[carro.tipo] || { label: carro.tipo, cor: "#888" };

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.nome}>{carro.nome}</Text>
        <Text style={styles.modelo}>{carro.modelo}</Text>
        <View style={[styles.badge, { backgroundColor: tipo.cor }]}>
          <Text style={styles.badgeText}>{tipo.label}</Text>
        </View>
      </View>
      <View style={styles.acoes}>
        <TouchableOpacity
          style={styles.btnEditar}
          onPress={() => onEditar(carro)}
        >
          <Text style={styles.btnText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnDeletar}
          onPress={() => onDeletar(carro)}
        >
          <Text style={styles.btnText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1A1D27",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2D3A",
  },
  info: { flex: 1 },
  nome: { color: "#fff", fontSize: 17, fontWeight: "700" },
  modelo: { color: "#aaa", fontSize: 13, marginTop: 2 },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 6,
  },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  acoes: { gap: 8 },
  btnEditar: { padding: 6 },
  btnDeletar: { padding: 6 },
  btnText: { fontSize: 20 },
});
