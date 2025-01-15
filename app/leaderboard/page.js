import Divider from "@/components/Divider";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Leaderboard from "@/components/Leaderboard";
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs'

export default function leaderBoard() {
  return (
    <div>
      <ClerkProvider>
      <SignedIn>

        <Header/>
        <Divider/>
        
        <Leaderboard/>

        <Footer/>

      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      </ClerkProvider>
    </div>
  );
}