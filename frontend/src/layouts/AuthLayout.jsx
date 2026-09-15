import Header from "../components/Header";

const AuthLayout = ({ visual, content, footer }) => {
    return (
        <div className='auth-page'>
            <Header />

            <main className='auth'>
                <section className='auth__visual'>{visual}</section>
                <section className='auth__content'>{content}</section>
            </main>

            <footer className='footer'>{footer}</footer>
        </div>
    );
};

export default AuthLayout;
