import '../styles/GeneralStyles.css'

export const AboutScreen = () => {
  return (
    <div className="component-card">
      <h3 className='card-title'>Sobre mí</h3>
      <p className='card-text'>
        Soy autodidacta antes que nada: empecé a programar por mi cuenta y después complementé
        eso con estudios de Programación y Diseño de Videojuegos en Senati (2021–2025). Mi base
        es frontend (React, TypeScript, Next.js), pero en los últimos meses me metí de lleno en
        automatización con IA.
      </p>
      <p className='card-text'>
        Diseñé y lideré de punta a punta un bot conversacional en n8n para un negocio real:
        definí los requerimientos, armé una arquitectura con varios LLMs especializados
        trabajando junto a un motor de lógica de negocio en JavaScript, y tomé las decisiones
        de arquitectura cuando había más de un camino posible. Podés ver el detalle en la
        sección Ricksito.
      </p>
      <p className='card-text'>
        Me gusta entender un sistema completo y no solo la parte que me toca: requerimientos,
        arquitectura, testing, y los bugs que solo aparecen cuando alguien real usa lo que
        construiste.
      </p>
      <p className='card-text'>
        <a href="https://www.linkedin.com/in/kevin-vilchez-nuñez" target="_blank" rel="noreferrer">LinkedIn</a>
        {' · '}
        <a href="https://github.com/bakk20" target="_blank" rel="noreferrer">GitHub</a>
        {' · '}
        <a href="mailto:kevin.vilchez.n@gmail.com">kevin.vilchez.n@gmail.com</a>
      </p>
    </div>
  )
}
