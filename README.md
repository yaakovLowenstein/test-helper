# Test Helper

This extension provides help for testing.

## Command: Create Test File  
### Opens/ creates a test file for you from the class/function name.



#### Settings
    
![Settings](/images/CreateTestSettings.png)

 - **Create From File Name**
        
   * True -> test names are generated using the name of the file. 
           For example, if the path is home/shapes/rectangle.py the test file would be 'test_rectangle.py'
           
   * False -> test names are generated using the function/class name highlighted.
           For example, if the path is home/shapes/rectangle.py and the function get_width is selected. 
           The test file would be 'rectangle/test_get_width.py'


 - **TestFileStructure**
 
   * Currently there are 2 options. This is the location the test file will be placed. 
     (If there are other file structures needed, create a PR or an issue on github)


 - **MigrationsCreateFromFileName**
 
   * If True will always create tests for migrations using the file name whether or not there is text highlighted.


How to use:
1. If Create From File Name is False Highlight the text of the function/class you want to create a test file for (or open)
2. If Create From File Name is True Do not need to select anything 
3. Hit ctrl+shift+t
4. voile!

## Run test

#### Runs test of selected test name or of entire file.

How to use:
1) To run a single test, select the name of a test
2) To run entire test file do not select a test 
2) Hit ctrl+alt+r
3) voile!


# Known Issues

- Will not work for migrations
- Only works with file structure of appName/tests/path.../filename.py
- Only works for python files
- Run test does not allow you to define how you run tests. i.e pytest ... 

# Future Releases

Will make more dynamic.

Will generate tests when cursor in class/function not just when highlight the name.
