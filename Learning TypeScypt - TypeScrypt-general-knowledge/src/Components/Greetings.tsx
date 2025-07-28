type Props ={
    name: string;
};

const Greetings = ({ name }: Props) =>{

    return <h1>Hola, {name}!</h1>;
} 

export default Greetings