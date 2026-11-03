Feature: ECommerce E2E Validations
    @Regression
    Scenario: Placing and Order
        Given login to the Ecommerce application with the "girish.nayakar25@gmail.com" and "Renuka@123"
        When Add "ZARA Coat 3" to the cart
        Then validate that "ZARA Coat 3" displayed to the cart
        When valid details were added and placed the order
        Then verify order details present in the order history page


    Scenario Outline: Invalid Login
        Given login to the Ecommerce2 application with the "<username>" and "<password>"
        Then Verify the error message displayed
        Examples:
            | username                   | password    |
            | girish.nayakar25@gmail.com | Renuka@1234 |
            | hello@gmail.com            | Renuka@123  |
            | girish.nayakar@gmail.com   | Renuka@1234 |
            | girish.nayakar25@gmail.com |             |
            |                            | Renuka@1234 |
            | girish.nayakar25@gmail.com |             |
            |                            | Renuka@1234 |