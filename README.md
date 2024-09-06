# 👥📝 Collab Board

**Collab Board** is a real-time digital canvas for interactive, multi-user collaboration, built with modern web technologies. Whether you're brainstorming, planning, or just doodling with friends, this project offers a seamless experience for collaborative creativity!

![image](https://github.com/user-attachments/assets/d446c9bd-af99-45ad-a1c8-91cdd0c0855c)


## 🚀 Features

- **Authentication**: Secure login and session management with Clerk.
- **Real-time Presence**: See who’s online and what they’re doing using Liveblocks.
- **Backend Logic**: Powered by Convex for efficient server-side operations.
- **Beautiful UI**: Styled with Tailwind CSS and Chadcn/UI for a responsive and sleek design.
- **Custom Hooks & Providers**: Enhance reusability and state management.
- **Subscription Management**: Implemented with Stripe for handling recurring payments and subscription models.

## 🛠️ Technologies Used

- **Next.js**: Framework for server-rendered React applications.
- **Tailwind CSS**: Utility-first CSS framework.
- **Convex**: Handles server-side logic and data synchronization.
- **Liveblocks**: Manages real-time collaboration and presence.
- **Clerk**: User authentication and session management.
- **Stripe**: Payment processing and financial infrastructure.

## 🧑‍💻 Getting Started

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Yaroslaw07/collab_board.git
    ```
2. **Install dependencies**:
    ```bash
    npm install
    ```
3. **Set up environment variables**:
    - Create a `.env.local` file in the root of the project.
    - Add the required environment variable from `.env.example`
    - Replace the placeholder values with your actual keys.
  
    - Add the environment variables from `.env.convex.local` to Convex project
4. **Run the development server**:
    ```bash
    npm run dev
    ```
5. **Open your browser** at `http://localhost:3000` to see the project in action!

## 🌐 Deployment

The project is deployed on Vercel and can be accessed live at [collab-board.vercel.app](https://collab-board-ten.vercel.app/).

## 📚 Documentation

- For detailed setup and customization, check out the [Liveblocks](https://liveblocks.io/docs), [Clerk](https://clerk.dev/docs), [Convex](https://docs.convex.dev) and [Stripe](https://docs.stripe.com/) documentation.

## 🤝 Contributing

We welcome contributions! Feel free to submit issues, fork the repository, and create pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Yaroslaw07](https://github.com/Yaroslaw07)
