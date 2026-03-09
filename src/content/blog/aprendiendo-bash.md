---
title: "Bash no es magia: automatizando mi flujo de trabajo"
description: "De escribir comandos sueltos a crear scripts reales. Lo que aprendí en mis primeras semanas con Bash y terminal Linux."
pubDate: "2025-03-01"
image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Bash_Logo_black_and_white_icon_only.svg/1200px-Bash_Logo_black_and_white_icon_only.svg.png"
tags: ["Bash", "Terminal", "Automatización"]
draft: false
---

# Bash no es magia 🐚

Durante mucho tiempo usé la terminal como si fuera una caja negra: copiaba comandos de Stack Overflow, rezaba para que funcionaran, y seguía con mi vida. Hasta que decidí aprender Bash de verdad.

---

## Variables y comillas: la primera trampa

Las comillas en Bash no son iguales. Este fue mi primer WTF:

```bash
nombre="Walter"

echo "$nombre"   # Walter ✓  (expande la variable)
echo '$nombre'   # $nombre ✗  (literal, no expande)
echo "${nombre}_dev"  # Walter_dev ✓  (delimita la variable)
```

Regla de oro: **siempre doble comilla** para strings que pueden tener espacios.

---

## Condicionales: la sintaxis que parece error

```bash
if [ -f "$archivo" ]; then
    echo "El archivo existe"
elif [ -d "$ruta" ]; then
    echo "Es un directorio"
else
    echo "No existe nada aquí"
fi
```

Los espacios dentro de `[ ]` son **obligatorios**. `[-f "$archivo"]` truena. Aprendí eso a las malas.

---

## Loops: `for` y `while`

```bash
# Iterar sobre archivos
for archivo in *.md; do
    echo "Procesando: $archivo"
done

# While con contador
contador=0
while [ $contador -lt 5 ]; do
    echo "Vuelta $contador"
    ((contador++))
done
```

---

## Funciones: reutilizar sin repetir

```bash
saludar() {
    local nombre="$1"  # $1 = primer argumento
    echo "Hola, $nombre 👋"
}

saludar "Walter"
saludar "Gopher"
```

La palabra clave `local` es importante — sin ella, la variable es global y puede pisar otras variables por accidente.

---

## Mi primer script real: backup automático

Este fue el momento en que Bash dejó de ser abstracto:

```bash
#!/usr/bin/env bash
set -euo pipefail  # Fallar rápido y fuerte

ORIGEN="$HOME/proyectos"
DESTINO="$HOME/backups"
FECHA=$(date +%Y-%m-%d)
ARCHIVO="backup_$FECHA.tar.gz"

mkdir -p "$DESTINO"

echo "🗜️  Creando backup de $ORIGEN..."
tar -czf "$DESTINO/$ARCHIVO" "$ORIGEN"

echo "✅ Backup guardado en: $DESTINO/$ARCHIVO"
echo "📦 Tamaño: $(du -sh "$DESTINO/$ARCHIVO" | cut -f1)"
```

`set -euo pipefail` es lo primero que pongo en cualquier script ahora:

- `-e`: sale si cualquier comando falla
- `-u`: error si usas variable no definida
- `-o pipefail`: detecta fallos en pipes

---

## Herramientas que uso todo el tiempo

**`grep`** — buscar texto en archivos:

```bash
grep -rn "TODO" ./src          # recursivo, con número de línea
grep -i "error" logs.txt       # case-insensitive
```

**`find`** — encontrar archivos:

```bash
find . -name "*.go" -newer go.mod    # archivos Go más nuevos que go.mod
find /tmp -mtime +7 -delete          # eliminar archivos de hace más de 7 días
```

**`awk`** — procesar texto columnar:

```bash
# Imprimir la segunda columna
ps aux | awk '{print $2}'

# Sumar la quinta columna
awk '{sum += $5} END {print sum}' datos.txt
```

---

## Lo que todavía me traba

Los **process substitution** y los **here documents** me cuestan:

```bash
# Here document — aún me parece magia negra
cat <<EOF > config.txt
host=localhost
port=8080
debug=true
EOF
```

Y el modo de depuración que me salvó la vida: `bash -x script.sh` imprime cada comando antes de ejecutarlo. Imprescindible.

---

## Próximos pasos

- [ ] `sed` para edición de texto en stream
- [ ] Cron jobs para automatización programada
- [ ] Integrar scripts Bash con mis proyectos en Go
- [ ] Signal handling: `trap` para limpiar al salir

---

La terminal ya no me da miedo. Ahora me da pereza usar el ratón. 🐚
