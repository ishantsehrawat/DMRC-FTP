import java.util.Scanner;

public class Ex {
    public static void main(String args[]) {
        try {
            Scanner s = new Scanner(System.in);
            System.out.print("\tIshant Sehrawat \n\t03620802719\n");
            System.out.println("Enter numbers  ::");
            int a= s.nextInt();
            int b= s.nextInt();
            if(b != 0){
                System.out.println("Division  ::" + a/b);
            }
            else{
                throw new CustomException("You made an error.\n\t\t\t Denominator is 0");
            }
        }
        catch(CustomException e) {
            System.out.println(e);
        }
    }
}

class CustomException extends Exception {
    String message;

    CustomException(String str) {
        message = str;
    }
    public String toString() {
        return ("Custom Exception Occurred : " + message);
    }
}

