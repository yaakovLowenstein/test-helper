# Test Helper

This extension provides help for testing.

## Command: Create Test File  
### Opens/ creates a test file for you from the class/function name.



#### Settings
    
![Settings](/images/CreateTestSettings.png)


 - **Test File Structure**
 
   * Currently there are 2 options. This is the location the test file will be placed. 
     (If there are other file structures needed, create a PR or an issue on github)

**There are 2 types of tests you can create using this command.**

- If you select text in the file (i.e. a class/ function name) the test file will be the name of the function/class.
    * For example, if the file path is shapes/rectangle.py and the function you highlight is get_width. The test path will be
    shapes/rectangle/test_get_width.py
  
- If no text is selected the test file will be created from the file name.
    * For example, if the file path is shapes/rectangle.py the test path will be shapes/test_rectangle.py

How to use:
1. If you want the test to be created from function/class name, select the name (see above)
3. Hit ctrl+shift+t
4. voile!

## Run test

### Runs test of selected test name or of entire file.

#### Settings
    
![Settings](/images/runTestsSettings.png)

- **Run Test Command**
 
   * The command used to run your tests (i.e. if you are using a container would need to give path to run the tests)\

How to use:
1) To run a single test, select the name of a test
2) To run entire test file do not select a test 
2) Hit ctrl+alt+r
3) voile!

