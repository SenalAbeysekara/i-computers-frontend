export default function UserData({ image, Name, Email, Age }) {
    return (
        <div>
            <img src={image} alt="User" width="150" />
            <h2>User Data</h2>
            <p>Name: {Name}</p>
            <p>Email: {Email}</p>
            <p>Age: {Age}</p>
        </div>
    )
}
