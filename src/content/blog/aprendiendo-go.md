---
title: "Aprendiendo Go desde cero: semana 1"
description: "Mis primeras impresiones con Go v1.22: sintaxis, tipos, y por qué el Gopher me conquistó desde el día uno."
pubDate: "2025-03-08"
image: "https://go.dev/blog/gopher/header.jpg"
tags: ["Go", "Sistemas"]
draft: false
---

# Aprendiendo Go desde cero 🐹

Hace una semana decidí empezar con **Go (Golang)** y ya no puedo parar. La mascota —el famoso _Gopher_— puede parecer inofensiva, pero el lenguaje detrás de ella es una bestia de compilación rápida y concurrencia elegante.

---

## ¿Por qué Go?

Vengo de un interés por sistemas de bajo nivel y quería un lenguaje que:

- Compile a binarios nativos sin dependencias externas
- Tenga concurrencia de primera clase (goroutines + channels)
- Sea simple sin ser simplista

Go cumple todo eso. Y tiene al Gopher. Sold.

---

## Lo primero: la sintaxis

La declaración de variables en Go me sorprendió por su pragmatismo:

```go
// Declaración explícita
var nombre string = "Walter"

// Declaración corta (la que uso todo el tiempo)
nombre := "Walter"

// Múltiples valores
x, y := 10, 20
```

El operador `:=` es adictivo. Infiere el tipo automáticamente y ya.

---

## Funciones: múltiples valores de retorno

Esto es algo que no esperaba y me encantó:

```go
func dividir(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("no se puede dividir entre cero")
    }
    return a / b, nil
}

resultado, err := dividir(10, 2)
if err != nil {
    log.Fatal(err)
}
fmt.Println(resultado) // 5
```

El manejo de errores es explícito. Nada de excepciones ocultas — si algo falla, lo sabes de inmediato.

---

## Structs: el "objeto" de Go

Go no tiene clases, pero tiene `struct` con métodos:

```go
type Gopher struct {
    Nombre string
    Nivel  int
}

func (g Gopher) Saludar() string {
    return fmt.Sprintf("Hola, soy %s nivel %d 🐹", g.Nombre, g.Nivel)
}

gopher := Gopher{Nombre: "Walter", Nivel: 1}
fmt.Println(gopher.Saludar())
```

---

## Goroutines: concurrencia con `go`

Una de las cosas más cool de Go. Lanzar una goroutine es literalmente escribir `go` antes de una función:

```go
func descargar(url string) {
    // simula una descarga
    time.Sleep(2 * time.Second)
    fmt.Println("Descargado:", url)
}

go descargar("https://ejemplo.com/archivo1")
go descargar("https://ejemplo.com/archivo2")
// Ambas descargas corren en paralelo
```

---

## Lo que me cuesta

Honestamente, los **punteros** siguen siendo mi talón de Aquiles. El modelo de memoria de Go es más amigable que C, pero la diferencia entre pasar por valor vs por referencia todavía me hace dudar a veces.

```go
func incrementar(n *int) {
    *n++
}

valor := 5
incrementar(&valor)
fmt.Println(valor) // 6 ✓
```

---

## Próximos pasos

- [ ] Interfaces y duck typing en Go
- [ ] Channels para comunicación entre goroutines
- [ ] Construir un CLI simple con `os.Args` y `flag`
- [ ] Explorar el toolchain: `go build`, `go test`, `go mod`

---

El Gopher me tiene atrapado. Seguiré reportando. 🐹
