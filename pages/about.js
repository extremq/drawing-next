import Layout from './layout'

export default function About() {
    return (
        <Layout title={"About"}>
            <p1 className="text-lg">
                I'm Extremq and I love creating.
                <br /> <br />
                I've started my drawing journey in June 2023, at 20 years old.
                <br />
                I thought it would be interesting to post my drawings online and see how I progress.
                <br /> <br />
                I also have a <a className="text-blue-500 hover:text-blue-700 hover:underline font-semibold" href="https://suntdoar.eu">blog</a> where I post interesting stuff about anything.
                <br /> <br />
                If I inspire you to start drawing, then I'm happy.
            </p1>
        </Layout>
    )
}