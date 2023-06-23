import Layout from './layout'

export default function About() {
    return (
        <Layout title={"About"}>
            <p1 className="text-lg">
                I&apos;m Extremq and I love creating.
                <br /> <br />
                I&apos;ve started my drawing journey in June 2023, at 20 years old.
                <br />
                I thought it would be interesting to post my drawings online and see how I progress.
                <br /> <br />
                I also have a <a className="text-peri hover:text-peri-dark hover:underline font-semibold" target="_blank" href="https://suntdoar.eu">blog</a> where I post interesting stuff about anything.
                <br /> <br />
                If I inspire you to start drawing, then I&apos;m happy.
            </p1>
        </Layout>
    )
}