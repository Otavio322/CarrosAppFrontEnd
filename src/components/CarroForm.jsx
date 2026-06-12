import { useEffect, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const TIPOS = ["eletrico", "gasolina", "diesel", "hibrido"];
const TIPO_LABEL = {
  eletrico: "⚡ Elétrico",
  gasolina: "⛽ Gasolina",
  diesel: "🛢️ Diesel",
  hibrido: "⛽ + ⚡ Híbrido"
};
const EMPTY = { nome: "", modelo: "", tipo: "gasolina", iamgeURl: "" };

export default function CarroForm({ onSalvar, carroEditando, onCancelar }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (carroEditando) setForm(carroEditando);
    else setForm(EMPTY);
  }, [carroEditando]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {carroEditando ? "✏️ Editar Carro" : "➕ Novo Carro"}
      </Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Civic"
        placeholderTextColor="#666"
        value={form.nome}
        onChangeText={(v) => setForm({ ...form, nome: v })}
      />

      <Text style={styles.label}>Modelo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: EXL 2024"
        placeholderTextColor="#666"
        value={form.modelo}
        onChangeText={(v) => setForm({ ...form, modelo: v })}
      />

      <Text style={styles.label}>URL da Imagem</Text>
      <TextInput
        style={styles.input}
        placeholder="https://..."
        placeholderTextColor="#666"
        value={form.imageUrl}
        onChangeText={(v) => setForm({ ...form, imageUrl: v })}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Tipo</Text>
      <View style={styles.tiposRow}>
        {TIPOS.map((t) => (
          <TouchableOpacity
            key={t}
            style={[
              styles.tipoBotao,
              form.tipo === t && styles.tipoSelecionado,
            ]}
            onPress={() => setForm({ ...form, tipo: t })}
          >
            <Text
              style={[
                styles.tipoTexto,
                form.tipo === t && styles.tipoTextoAtivo,
              ]}
            >
              {TIPO_LABEL[t]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.btnSalvar} onPress={() => onSalvar(form)}>
        <Text style={styles.btnSalvarText}>
          {carroEditando ? "Salvar Alterações" : "Cadastrar"}
        </Text>
      </TouchableOpacity>

      {carroEditando && (
        <TouchableOpacity style={styles.btnCancelar} onPress={onCancelar}>
          <Text style={styles.btnCancelarText}>Cancelar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A1D27",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#2A2D3A",
  },
  titulo: { color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 16 },
  label: {
    color: "#aaa",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: "#0F1117",
    borderWidth: 1,
    borderColor: "#2A2D3A",
    borderRadius: 8,
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 12,
  },
  tiposRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  tipoBotao: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#2A2D3A",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#0F1117",
  },
  tipoSelecionado: { borderColor: "#E63946", backgroundColor: "#2a0a0e" },
  tipoTexto: { color: "#888", fontSize: 12, fontWeight: "600" },
  tipoTextoAtivo: { color: "#E63946" },
  btnSalvar: {
    backgroundColor: "#E63946",
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: "center",
  },
  btnSalvarText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  btnCancelar: {
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: "center",
    marginTop: 8,
  },
  btnCancelarText: { color: "#aaa", fontSize: 14 },
});
